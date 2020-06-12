from starlette.routing import Route
from .handlers import book_list, GenreList, TagList

books_routes = [
    Route('/', book_list, methods=['get']),
]

genres_routes = [
    Route('/', GenreList)
]

tags_routes = [
    Route('/', TagList)
]
