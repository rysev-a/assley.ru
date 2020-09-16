import json
from sqlalchemy import desc, asc
from starlette.authentication import requires
from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import (
    ListResource,
    DetailResource,
    check_unique_name_update,
    check_unique_name_create
)
from ..models import Tag
from ..schemas import TagSchema


class TagList(ListResource):
    schema = TagSchema
    model = Tag
    db = db

    async def post(self, request):
        return await check_unique_name_create(
            self, request, super().post, 'Такой тэг уже существет')


class TagDetail(DetailResource):
    schema = TagSchema
    model = Tag
    db = db

    async def put(self, request):
        return await check_unique_name_update(
            self, request, super().put, 'Такой тэг уже существет')
