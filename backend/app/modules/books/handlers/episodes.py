from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..models import Episode
from ..schemas import EpisodeSchema


class EpisodeList(ListResource):
    schema = EpisodeSchema
    model = Episode
    db = db


class EpisodeDetail(DetailResource):
    schema = EpisodeSchema
    model = Episode
    db = db
