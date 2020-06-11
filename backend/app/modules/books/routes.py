from starlette.routing import Route
from .handlers import book_list, genre_list

books_routes = [
    Route('/', book_list, methods=['get']),
    Route('/genres', genre_list, methods=['get'])
]
