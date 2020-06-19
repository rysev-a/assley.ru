from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import ListResource, DetailResource
from .models import User
from .schemas import UserSchema


class UserList(ListResource):
    db = db
    model = User
    schema = UserSchema


class UserDetail(DetailResource):
    db = db
    model = User
    schema = UserSchema
