from starlette.routing import Route
from .handlers import user_list

users_routes = [
    Route('/', user_list)
]
