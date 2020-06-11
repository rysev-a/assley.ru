from sqlalchemy import desc, asc
from starlette.authentication import requires
from starlette.responses import JSONResponse
from .models import Book, Genre, BookGenreAssocciation
from app.core.database import db
from .schemas import BookSchema, GenreSchema


async def book_list(request):
    books_schema = BookSchema(many=True)

    query = Book.outerjoin(BookGenreAssocciation).outerjoin(Genre).select().order_by(
        asc(Book.id)
    ).limit(3).offset(4)

    books = await query.gino.load(
        Book.distinct(Book.id).load(add_genre=Genre.distinct(Genre.id))).all()

    return JSONResponse({
        "status": "success",
        "books": books_schema.dump(books)
    })


async def genre_list(request):
    genres = await Genre.query.gino.all()
    genres_schema = GenreSchema(many=True)

    return JSONResponse({
        "status": "success",
        "genres": genres_schema.dump(genres)
    })
