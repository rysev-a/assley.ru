import json
from sqlalchemy import desc, asc
from starlette.authentication import requires
from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..models import (
    Book,
    Genre,
    Tag,
    BookGenreAssocciation,
    BookSectionAssocciation,
    BookTagAssocciation
)
from ..schemas import BookSchema, GenreSchema, TagSchema


class BookList(ListResource):
    db = db
    model = Book
    schema = BookSchema

    async def get(self, request):
        books_schema = BookSchema(many=True)
        self.request = request
        self.query = Book.outerjoin(BookGenreAssocciation)
        self.query = self.query.outerjoin(
            Genre).select().order_by(asc(Book.id))

        await super().apply_paginate()

        books = await self.query.gino.load(
            Book.distinct(Book.id).load(add_genre=Genre.distinct(Genre.id))).all()

        return JSONResponse({
            'status': 'success',
            'items': books_schema.dump(books),
            'pages': self.pages
        })

    async def post(self, request):
        data = await request.json()
        book = await Book.create(
            title=data.get('title'),
            description=data.get('description')
        )

        # TODO: optimize add resources
        for genre_id in data.get('genres', []):
            await BookGenreAssocciation.create(
                book_id=book.id,
                genre_id=genre_id,
            )

        for tag_id in data.get('tags', []):
            await BookTagAssocciation.create(
                book_id=book.id,
                tag_id=tag_id,
            )

        for section_id in data.get('sections', []):
            await BookSectionAssocciation.create(
                book_id=book.id,
                section_id=section_id,
            )

        return JSONResponse({
            'data': data,
            'item': self.schema().dump(book),
            'succes': True,
        })


class BookDetail(DetailResource):
    db = db
    model = Book
    schema = BookSchema
