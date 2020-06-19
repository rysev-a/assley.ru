import json
from functools import reduce

from sqlalchemy import desc, asc, Constraint
from starlette.authentication import requires
from starlette.responses import JSONResponse
from starlette.config import Config

from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..schemas import (
    BookSchema,
    GenreSchema,
    TagSchema,
    SeasonSchema,
    EpisodeSchema
)

from ..models import (
    Book,
    Genre,
    Tag,
    Section,
    Season,
    Episode,
    Author,
    Translator,
    Publisher,
    Painter,

    BookGenreAssocciation,
    BookSectionAssocciation,
    BookTagAssocciation,
    BookAuthorAssocciation,
    BookPainterAssocciation,
    BookTranslatorAssocciation,
    BookPublisherAssocciation,
)


class BookList(ListResource):
    db = db
    model = Book
    schema = BookSchema
    limit = 20

    def extract(self, items, item):
        items[item.book_id] = items.get(item.book_id, [])
        id_key = str(item.keys()[4])
        items[item.book_id].append({
            'id': item[id_key],
            'name': item.name
        })
        return items

    async def inject_resources(self, books):
        ids = [book.get('id') for book in books]
        for (key, model, assocciation) in [
            ('genres', Genre, BookGenreAssocciation),
            ('tags', Tag, BookTagAssocciation),
            ('sections', Section, BookSectionAssocciation),
            ('authors', Author, BookAuthorAssocciation),
            ('translators', Translator, BookTranslatorAssocciation),
            ('publishers', Publisher, BookPublisherAssocciation),
            ('painters', Painter, BookPainterAssocciation),
        ]:
            data = await model.join(assocciation)\
                .select()\
                .where(assocciation.book_id.in_(ids))\
                .gino.all()

            data = reduce(self.extract, data, {})
            books = [{**book, key: data.get(book.get('id'), [])}
                     for book in books]

        return books

    async def get(self, request):
        self.request = request
        self.query = self.model.query.order_by(asc(self.model.id))
        await self.apply_paginate()
        await self.apply_filters()

        books = await self.query.gino.all()
        books_with_resources = await self.inject_resources(
            self.schema(many=True).dump(books)
        )

        return JSONResponse({
            'success': True,
            'items': books_with_resources,
            'pages': self.pages
        })

    async def create_resources(self, book_id, data):
        models = [
            ('genres', 'genre_id', BookGenreAssocciation),
            ('tags', 'tag_id', BookTagAssocciation),
            ('sections', 'section_id', BookSectionAssocciation),
            ('authors', 'author_id', BookAuthorAssocciation),
            ('painters', 'painter_id', BookPainterAssocciation),
            ('translators', 'translator_id', BookTranslatorAssocciation),
            ('publishers', 'publisher_id', BookPublisherAssocciation),
        ]

        for table, id_key, model in models:
            for id in data.get(table, []):
                await model.create(**{
                    'book_id': book_id,
                    id_key: id,
                })

    async def post(self, request):
        form = await request.form()
        data = json.loads(form.get('payload'))

        book = await Book.create(
            title=data.get('title'),
            description=data.get('description')
        )

        for episode_fields in data.get('episodes'):
            file = form[episode_fields.get('file')]
            episode = {**episode_fields, 'file': file}
            await Episode.upload(episode=episode, book_id=book.id)

        await self.create_resources(book.id, data)

        return JSONResponse({
            'data': data,
            'item': self.schema().dump(book),
            'succes': True,
        })


class BookDetail(DetailResource):
    db = db
    model = Book
    schema = BookSchema

    async def delete(self, request):
        id = request.path_params['id']
        book = await self.model.get(id)
        await book.delete()
        return JSONResponse({
            'success': True
        })

    async def inject_resources(self, id):
        resources = {}
        for (key, model, assocciation) in [
            ('genres', Genre, BookGenreAssocciation),
            ('tags', Tag, BookTagAssocciation),
            ('sections', Section, BookSectionAssocciation),
            ('authors', Author, BookAuthorAssocciation),
            ('translators', Translator, BookTranslatorAssocciation),
            ('publishers', Publisher, BookPublisherAssocciation),
            ('painters', Painter, BookPainterAssocciation),
        ]:
            data = await model.join(assocciation)\
                .select()\
                .where(assocciation.book_id == id)\
                .gino.all()
            resources[key] = [{
                'name': item.name, 'id': item[str(item.keys()[4])]
            } for item in data]

        return resources

    async def inject_seasons(self, id):
        seasons = await Season.query.where(Season.book_id == id).gino.all()
        episodes = EpisodeSchema(many=True).dump(
            await Episode.query.where(Episode.season_id.in_(
                [season.id for season in seasons]
            )).gino.all())

        return [{
            **season,
            'episodes': [
                episode for episode in episodes
                if episode.get('season_id') == season.get('id')
            ]
        } for season in SeasonSchema(many=True).dump(seasons)]

    async def get(self, request):
        id = request.path_params['id']
        item = await self.model.get(id)
        resources = await self.inject_resources(id)
        seasons = await self.inject_seasons(id)

        return JSONResponse({
            'success': True,
            'item': {
                **self.schema().dump(item),
                **resources,
                'seasons': seasons,
            }
        })
