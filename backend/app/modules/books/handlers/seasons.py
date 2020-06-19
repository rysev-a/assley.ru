from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..models import Season
from ..schemas import SeasonSchema


class SeasonList(ListResource):
    schema = SeasonSchema
    model = Season
    db = db


class SeasonDetail(DetailResource):
    schema = SeasonSchema
    model = Season
    db = db
