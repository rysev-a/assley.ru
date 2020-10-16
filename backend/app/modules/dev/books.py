import yaml
import shutil
import os

from app.modules.books.models import (
    Book,
    Genre,
    Tag,
    Section,
    Painter,
    Author,
    Publisher,
    Translator,
    Season,
    Episode,
    BookGenreAssocciation,
    BookTagAssocciation,
    BookSectionAssocciation,
    BookAuthorAssocciation,
    BookPublisherAssocciation,
    BookPainterAssocciation,
    BookTranslatorAssocciation,
)
from app.core.database import db
from starlette.config import Config


config = Config('.env')
base_dir = config('APP_PATH')
upload_path = config('UPLOAD_PATH')

sources_path = f'{base_dir}/fixtures/book_sources'


def get_episode_path(book, season, episode):
    return f'{sources_path}/{book}/{season}/{episode}'


async def set_resources(book_id, resources, model, assocciation, key):
    for name in resources:
        element = await model.query.where(
            model.name == name
        ).gino.first() or await model.create(name=name)

        await assocciation.create(**{
            key: element.id,
            "book_id": book_id
        })


async def generate_book(book_index):
    translator = await Translator.query.where(
        Translator.name == "Assley Team"
    ).gino.first()

    yaml_mock = f'{sources_path}/{book_index}/info.yaml'

    with open(yaml_mock) as mock_data:
        book = yaml.load(mock_data, Loader=yaml.FullLoader)

    book_sources = book.get('sources')
    book_path = book_sources.get('path')
    book_cover = book_sources.get('cover')

    new_book = await Book.create(**{
        'rus_title': book.get('rus_title'),
        'eng_title': book.get('eng_title'),
        'release_year': book.get('release_year'),
        'description': book.get('description'),
        'cover_image': book_cover
    })

    for key, model, assocciation, resources in [
        ["genre_id", Genre, BookGenreAssocciation, book.get("genres")],
        ["tag_id", Tag, BookTagAssocciation, book.get("tags")],
        ["section_id", Section, BookSectionAssocciation, book.get("sections")],
        ["author_id", Author, BookAuthorAssocciation, book.get("authors")],
        ["painter_id", Painter, BookPainterAssocciation, book.get("painters")],
        ["translator_id", Translator,
            BookTranslatorAssocciation, book.get("translators")],
        ["publisher_id", Publisher, BookPublisherAssocciation,
            book.get("publishers")],
    ]:
        await set_resources(
            book_id=new_book.id,
            resources=resources,
            model=model,
            assocciation=assocciation,
            key=key,
        )

    # copy cover
    shutil.copyfile(
        f'{sources_path}/{book_path}/{book_cover}',
        f'{upload_path}/public/{book_cover}'
    )

    for season in book_sources.get('seasons'):
        season_number = season.get('number')
        new_season = await Season.create(
            number=season_number,
            book_id=new_book.id,
        )
        for episode in season.get('episodes'):
            episode_name = episode.get('name')
            episode_number = episode.get('number')
            episode_path = get_episode_path(
                book_path,
                season_number,
                episode_number,
            )

            dest_path = f'{upload_path}/public/{book_path}-{episode_number}'
            shutil.copytree(
                episode_path,
                dest_path
            )

            new_episode = await Episode.create(
                name=episode_name,
                number=episode_number,
                translator_id=translator.id,
                season_id=new_season.id,
                pages={
                    "uuid": f'{book_path}-{episode_number}',
                    "pages": os.listdir(dest_path)
                }
            )


async def generate_books():
    for book_index in os.listdir(sources_path):
        await generate_book(book_index)
