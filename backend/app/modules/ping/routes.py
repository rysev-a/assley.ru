from starlette.routing import Route
from .handlers import ping

ping_routes = [
    Route('/', ping)
]
