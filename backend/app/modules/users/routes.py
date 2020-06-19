from starlette.routing import Route
from .handlers import UserList, UserDetail


users_routes = [
    Route('/', UserList),
    Route('/{id:int}', UserDetail)
]
