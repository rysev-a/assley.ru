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
    EpisodeList,
    AuthorDetail,
    AuthorList,
    PainterDetail,
    PainterList,
    TranslatorDetail,
    TranslatorList,
    PublisherDetail,
    PublisherList
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

authors_routes = [
    Route('/', AuthorList),
    Route('/{id:int}', AuthorDetail)
]

translators_routes = [
    Route('/', TranslatorList),
    Route('/{id:int}', TranslatorDetail)
]

painters_routes = [
    Route('/', PainterList),
    Route('/{id:int}', PainterDetail)
]

publishers_routes = [
    Route('/', PublisherList),
    Route('/{id:int}', PublisherDetail)
]
