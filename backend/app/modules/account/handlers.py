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
        return JSONResponse({'success': False}, status_code=400)

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
            'message': {'email': 'Такого email не существует'}
        }, status_code=400)

    log_success = bcrypt.checkpw(
        password.encode('utf-8'),
        user.password_hash.encode('utf-8')
    )

    if not log_success:
        return JSONResponse({
            'success': False,
            'message': {'password': 'Неверный пароль'}
        }, status_code=400)

    token = generate_jwt({
        "id": user.id,
        "email": user.email,
        "nickname": user.nickname,
    })

    return JSONResponse({
        'success': True,
        'token': token,
        'account': AccountSchema().dump(user)
    })


async def signup(request):
    json = await request.json()
    email = json.get('email')

    user_email = await User.query.where(User.email == email).gino.first()

    if user_email:
        return JSONResponse({
            'success': False,
            # TODO: implement localiztion
            'message': {
                'email': 'Такой адрес уже занят'
            }
        }, status_code=400)

    password = json.get('password').encode('utf-8')
    password_hash = bcrypt.hashpw(password, salt)

    await User.create(
        email=json.get('email'),
        nickname=json.get('nickname'),
        password_hash=password_hash.decode('utf-8')
    )

    return JSONResponse({
        'success': True,
        **json
    })
