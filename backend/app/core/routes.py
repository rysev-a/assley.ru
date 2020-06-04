from starlette.routing import Mount
from ..modules.ping.routes import ping_routes
from ..modules.users.routes import users_routes
from ..modules.books.routes import books_routes

routes = [
    Mount('/api/v1/ping', routes=ping_routes),
    Mount('/api/v1/users', routes=users_routes),
    Mount('/api/v1/books', routes=books_routes),
]
