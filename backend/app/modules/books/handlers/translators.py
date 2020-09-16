from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import (
    ListResource,
    DetailResource,
    check_unique_name_update,
    check_unique_name_create
)

from ..models import Translator
from ..schemas import TranslatorSchema


class TranslatorList(ListResource):
    schema = TranslatorSchema
    model = Translator
    db = db

    async def post(self, request):
        return await check_unique_name_create(
            self, request, super().post, 'Такой переводчик уже существет')


class TranslatorDetail(DetailResource):
    schema = TranslatorSchema
    model = Translator
    db = db

    async def put(self, request):
        return await check_unique_name_update(
            self, request, super().put, 'Такой переводчик уже существет')
