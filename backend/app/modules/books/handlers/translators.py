from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..models import Translator
from ..schemas import TranslatorSchema


class TranslatorList(ListResource):
    schema = TranslatorSchema
    model = Translator
    db = db


class TranslatorDetail(DetailResource):
    schema = TranslatorSchema
    model = Translator
    db = db
