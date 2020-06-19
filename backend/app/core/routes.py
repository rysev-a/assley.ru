from starlette.routing import Mount
from ..modules.ping.routes import ping_routes
from ..modules.users.routes import users_routes
from ..modules.books.routes import (
    books_routes,
    genres_routes,
    tags_routes,
    sections_routes,
    seasons_routes,
    episodes_routes,
    authors_routes,
    translators_routes,
    painters_routes,
    publishers_routes,
)
from ..modules.account.routes import account_routes
from ..modules.dev.routes import dev_routes

routes = [
    Mount('/api/v1/ping', routes=ping_routes),
    Mount('/api/v1/users', routes=users_routes),
    Mount('/api/v1/account', routes=account_routes),
    Mount('/api/v1/dev', routes=dev_routes),

    # books module
    Mount('/api/v1/books', routes=books_routes),
    Mount('/api/v1/genres', routes=genres_routes),
    Mount('/api/v1/tags', routes=tags_routes),
    Mount('/api/v1/sections', routes=sections_routes),
    Mount('/api/v1/seasons', routes=seasons_routes),
    Mount('/api/v1/episodes', routes=episodes_routes),
    Mount('/api/v1/authors', routes=authors_routes),
    Mount('/api/v1/translators', routes=translators_routes),
    Mount('/api/v1/painters', routes=painters_routes),
    Mount('/api/v1/publishers', routes=publishers_routes)
]
