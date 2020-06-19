from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..models import Painter
from ..schemas import PainterSchema


class PainterList(ListResource):
    schema = PainterSchema
    model = Painter
    db = db


class PainterDetail(DetailResource):
    schema = PainterSchema
    model = Painter
    db = db
