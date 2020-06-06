import bcrypt
import jwt
from time import time
from starlette.responses import JSONResponse
from starlette.config import environ
from starlette.config import Config
from app.core.auth import check_access_token
from ..users.models import User
from .schemas import AccountSchema

config = Config('.env')
secret = config('SECRET_KEY')
salt = bcrypt.gensalt()


def generate_jwt(account):
    token = jwt.encode({
        "exp": time() + 604800,
        **account,
    }, secret, algorithm='HS256').decode('utf-8')
    return token


async def load(request):
    account_jwt = check_access_token(request)
    if not account_jwt:
        return JSONResponse({'success': False}, status_code=404)

    account = await User.get(account_jwt.get('id'))
    account_schema = AccountSchema()

    return JSONResponse({
        "status": "success",
        "account": account_schema.dump(account)
    })


async def login(request):
    json = await request.json()
    email = json.get('email')
    password = json.get('password')
    user = await User.query.where(User.email == email).gino.first()

    if not user:
        return JSONResponse({
            'success': False,
            'form_errors': {'email': 'email not found'}
        }, status_code=404)

    log_success = bcrypt.checkpw(
        password.encode('utf-8'),
        user.password_hash.encode('utf-8')
    )

    if not log_success:
        return JSONResponse({
            'success': False,
            'form_errors': {'password': 'invalid password'}
        }, status_code=404)

    token = generate_jwt({
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    })

    return JSONResponse({
        'status': 'success',
        'token': token
    })


async def signup(request):
    json = await request.json()
    email = json.get('email')
    password = json.get('password').encode('utf-8')
    password_hash = bcrypt.hashpw(password, salt)

    await User.create(
        email=json.get('email'),
        first_name=json.get('first_name'),
        last_name=json.get('last_name'),
        password_hash=password_hash.decode('utf-8')
    )

    return JSONResponse({
        'status': 'success',
        **json
    })
