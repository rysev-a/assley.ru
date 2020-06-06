from starlette.authentication import requires
from starlette.responses import JSONResponse
from .models import Book, books_mock
from app.core.database import db
from .schemas import BookSchema


@requires('authenticated')
async def book_list(request):
    books = await Book.query.gino.all()
    books_schema = BookSchema(many=True)

    return JSONResponse({
        "status": "success",
        "books": books_schema.dump(books)
    })
