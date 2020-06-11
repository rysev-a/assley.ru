from starlette.routing import Route
from .handlers import command

dev_routes = [
    Route('/command', command, methods=['post'])
]
