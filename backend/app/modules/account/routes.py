from starlette.routing import Route
from .handlers import login, signup, load

account_routes = [
    Route('/login', login, methods=['post']),
    Route('/signup', signup, methods=['post']),
    Route('/load', load, methods=['get'])
]
