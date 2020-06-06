import jwt
from starlette.authentication import (
    AuthenticationBackend, AuthenticationError, SimpleUser, UnauthenticatedUser,
    AuthCredentials
)
from starlette.config import Config
from starlette.middleware import Middleware
from starlette.middleware.authentication import AuthenticationMiddleware
from starlette.responses import PlainTextResponse
from starlette.routing import Route
import base64
import binascii

config = Config('.env')
secret = config('SECRET_KEY')


def check_access_token(request):
    if 'Access-Token' not in request.headers:
        return False

    accessToken = request.headers['Access-Token']
    try:
        account = jwt.decode(accessToken, secret, algorithms=['HS256'])
        return account
    except jwt.ExpiredSignature:
        return False


class BasicAuthBackend(AuthenticationBackend):
    async def authenticate(self, request):
        if (
            'Access-Token' not in request.headers or
            '/login' in str(request.url)
        ):
            return

        account = check_access_token(request)

        if not account:
            return

        return AuthCredentials(["authenticated"]), SimpleUser(account.get('email'))


auth = Middleware(AuthenticationMiddleware, backend=BasicAuthBackend())
