from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..models import Author
from ..schemas import AuthorSchema


class AuthorList(ListResource):
    schema = AuthorSchema
    model = Author
    db = db


class AuthorDetail(DetailResource):
    schema = AuthorSchema
    model = Author
    db = db
