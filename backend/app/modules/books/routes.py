from starlette.routing import Route
from .handlers import (
    BookList,
    BookDetail,
    GenreList,
    GenreDetail,
    TagList,
    TagDetail,
    SectionDetail,
    SectionList
)

books_routes = [
    Route('/', BookList),
    Route('/{id:int}', BookDetail)
]

genres_routes = [
    Route('/', GenreList),
    Route('/{id:int}', GenreDetail)
]

tags_routes = [
    Route('/', TagList),
    Route('/{id:int}', TagDetail)
]

sections_routes = [
    Route('/', SectionList),
    Route('/{id:int}', SectionDetail)
]
