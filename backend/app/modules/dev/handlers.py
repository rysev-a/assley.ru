import yaml
import bcrypt
from starlette.responses import JSONResponse
from starlette.config import Config
from app.core.database import db
from app.modules.account.handlers import salt
from app.modules.users.models import User
from app.modules.books.models import (
    Book,
    Genre,
    Tag,
    Section,
    BookGenreAssocciation,
    BookTagAssocciation,
    BookSectionAssocciation,
)

config = Config(".env")


async def generate(mock, Model):
    base_dir = config('APP_PATH')
    mock_path = f'{base_dir}/fixtures/{mock}.yaml'

    with open(mock_path) as mock_data:
        for model_data in yaml.load(mock_data, Loader=yaml.FullLoader):
            await Model.create(**model_data)


async def test():
    print('test')


async def get_count():
    genres_count = await db.func.count(Genre.id).gino.scalar()
    print(genres_count)


async def select_with_nested():
    query = Book.outerjoin(BookGenreAssocciation).outerjoin(Genre).select()
    books = await query.gino.load(
        Book.distinct(Book.id).load(add_genre=Genre.distinct(Genre.id))).all()

    for b in books:
        print(b.title, ': ------ ')
        for g in b.genres:
            print(g.name)


async def generate_genres():
    await generate('genres', Genre)


async def generate_tags():
    await generate('tags', Tag)


async def generate_sections():
    await generate('sections', Section)


async def generate_books():
    base_dir = config('APP_PATH')
    mock_path = f'{base_dir}/fixtures/books.yaml'

    genres = await Genre.query.gino.all()
    sections = await Section.query.gino.all()
    tags = await Tag.query.gino.all()

    with open(mock_path) as mock_data:
        for model_data in yaml.load(mock_data, Loader=yaml.FullLoader):
            book = await Book.create(**model_data)
            for genre in genres[0:10]:
                await BookGenreAssocciation.create(
                    book_id=book.id,
                    genre_id=genre.id,
                )

            for tag in tags[0:10]:
                await BookTagAssocciation.create(
                    book_id=book.id,
                    tag_id=tag.id,
                )

            for section in sections[0:10]:
                await BookSectionAssocciation.create(
                    book_id=book.id,
                    section_id=section.id,
                )


async def generate_users():
    base_dir = config('APP_PATH')
    mock_path = f'{base_dir}/fixtures/users.yaml'

    with open(mock_path) as mock_data:
        for model_data in yaml.load(mock_data, Loader=yaml.FullLoader):
            password = model_data.get('password').encode('utf-8')
            await User.create(
                email=model_data.get('email'),
                first_name=model_data.get('first_name'),
                last_name=model_data.get('last_name'),
                password_hash=bcrypt.hashpw(password, salt).decode('utf-8'),
            )


async def clear_database():
    await db.gino.drop_all()
    await db.gino.create_all()


async def load_database():
    await clear_database()
    await generate_genres()
    await generate_tags()
    await generate_sections()
    # await generate_books()
    await generate_users()


commands = {
    'generate-books': generate_books,
    'generate-genres': generate_genres,
    'generate-tags': generate_tags,
    'generate-sections': generate_sections,
    'load-database': load_database,
    'clear-database': clear_database,
    'test': test
}


async def command(request):
    data = await request.json()
    command = commands[data.get('command')]
    await command()

    return JSONResponse({
        'success': True
    })
