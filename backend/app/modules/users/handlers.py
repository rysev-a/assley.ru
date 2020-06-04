from starlette.responses import JSONResponse
from .models import User
from app.core.database import db
from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Int()
    nickname = fields.Str()


async def user_list(request):
    all_users = await User.query.gino.all()
    users_schema = UserSchema(many=True)

    return JSONResponse({
        "status": "success",
        "users": users_schema.dump(all_users)
    })
