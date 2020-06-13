import json
from sqlalchemy import desc, asc
from starlette.authentication import requires
from starlette.responses import JSONResponse
from app.core.database import db
from app.core.api import ListResource, DetailResource

from ..schemas import SectionSchema
from ..models import Section


class SectionList(ListResource):
    schema = SectionSchema
    model = Section
    db = db

    async def post(self, request):
        data = await request.json()
        name = data.get('name')
        item = await self.model.query.where(self.model.name == name).gino.first()
        if item:
            return JSONResponse({
                'success': False,
                'message': {'name': 'Такой раздел уже существет'}
            }, status_code=400)

        response = await super().post(request)
        return response


class SectionDetail(DetailResource):
    schema = SectionSchema
    model = Section
    db = db

    async def put(self, request):
        print('put')
        id = request.path_params['id']

        data = await request.json()
        name = data.get('name')
        item = await self.model.query.where(self.model.name == name).gino.first()
        if item and item.id != id:
            return JSONResponse({
                'success': False,
                'message': {'name': 'Такой раздел уже существет'}
            }, status_code=400)

        response = await super().put(request)
        return response
