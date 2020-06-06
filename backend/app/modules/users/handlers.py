from starlette.responses import JSONResponse
from app.core.database import db
from .models import User
from .schemas import UserSchema


async def user_list(request):
    all_users = await User.query.gino.all()
    users_schema = UserSchema(many=True)

    return JSONResponse({
        "status": "success",
        "users": users_schema.dump(all_users)
    })
