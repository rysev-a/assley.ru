from starlette.routing import Route
from .handlers import (
    BookList,
    BookDetail,
    GenreList,
    GenreDetail,
    TagList,
    TagDetail,
    SectionDetail,
    SectionList,
    SeasonDetail,
    SeasonList,
    EpisodeDetail,
    EpisodeList
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

seasons_routes = [
    Route('/', SeasonList),
    Route('/{id:int}', SeasonDetail)
]

episodes_routes = [
    Route('/', EpisodeList),
    Route('/{id:int}', EpisodeDetail)
]
