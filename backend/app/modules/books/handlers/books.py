import json
from functools import reduce

from sqlalchemy import desc, asc, Constraint
from starlette.authentication import requires
from starlette.responses import JSONResponse
from starlette.config import Config

from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..schemas import BookSchema, GenreSchema, TagSchema
from ..models import (
    Book,
    Genre,
    Tag,
    Section,
    BookGenreAssocciation,
    BookSectionAssocciation,
    BookTagAssocciation
)

from ..utils import unzip_episode


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
            ('sections', Section, BookSectionAssocciation)
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

    async def create_resources(self, book_id):
        data = await self.request.json()
        models = [
            ('genres', 'genre_id', BookGenreAssocciation),
            ('tags', 'tag_id', BookTagAssocciation),
            ('sections', 'section_id', BookSectionAssocciation)]

        for table, id_key, model in models:
            for id in data.get(table, []):
                print(table, id_key, model, book_id)
                await model.create(**{
                    'book_id': book_id,
                    id_key: id,
                })

    async def post(self, request):
        self.request = request

        data = await self.request.json()
        episode_info = unzip_episode(data.get('file'))

        print(episode_info)

        book = await Book.create(
            title=data.get('title'),
            description=data.get('description')
        )
        await self.create_resources(book.id)
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
            ('sections', Section, BookSectionAssocciation)
        ]:
            data = await model.join(assocciation)\
                .select()\
                .where(assocciation.book_id == id)\
                .gino.all()
            resources[key] = [{
                'name': item.name, 'id': item[str(item.keys()[4])]
            } for item in data]

        return resources

    async def get(self, request):
        id = request.path_params['id']
        item = await self.model.get(id)
        resources = await self.inject_resources(id)

        return JSONResponse({
            'success': True,
            'item': {
                **self.schema().dump(item),
                **resources,
            }
        })
