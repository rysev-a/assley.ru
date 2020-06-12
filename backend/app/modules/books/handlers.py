import json
from sqlalchemy import desc, asc
from starlette.authentication import requires
from starlette.responses import JSONResponse
from .models import Book, Genre, Tag, BookGenreAssocciation
from app.core.database import db
from app.core.api.list_resource import ListResource
from .schemas import BookSchema, GenreSchema, TagSchema


async def book_list(request):
    books_schema = BookSchema(many=True)
    query = Book.outerjoin(BookGenreAssocciation).outerjoin(Genre).select().order_by(
        asc(Book.id)
    ).limit(3).offset(4)

    books = await query.gino.load(
        Book.distinct(Book.id).load(add_genre=Genre.distinct(Genre.id))).all()

    return JSONResponse({
        'status': 'success',
        'books': books_schema.dump(books)
    })


class GenreList(ListResource):
    schema = GenreSchema
    model = Genre
    db = db


class TagList(ListResource):
    schema = TagSchema
    model = Tag
    db = db
