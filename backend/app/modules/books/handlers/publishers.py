from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..models import Publisher
from ..schemas import PublisherSchema


class PublisherList(ListResource):
    schema = PublisherSchema
    model = Publisher
    db = db


class PublisherDetail(DetailResource):
    schema = PublisherSchema
    model = Publisher
    db = db
