from starlette.routing import Route
from .handlers import book_list

books_routes = [
    Route('/', book_list)
]
