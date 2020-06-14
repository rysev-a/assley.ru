import json
from sqlalchemy import desc, asc
from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse


class ListResource(HTTPEndpoint):
    page = 1
    pages = 1
    limit = 0

    async def apply_filters(self):
        filters = json.loads(
            self.request.query_params.get('filters', '[]'))

        for filter in filters:
            key = filter.get('key')
            value = filter.get('value')
            method = filter.get('operator')

            if not value:
                continue

            # start with helper
            if method == 'startWith':
                method = 'ilike'
                value = f'{value}%'

            column = getattr(self.model, key, None)
            operator = getattr(column, method, None)

            if operator:
                self.query = self.query.where(operator(value))

            if method == '==':
                self.query = self.query.where(column == value)
            if method == '>=':
                self.query = self.query.where(column >= value)
            if method == '>':
                self.query = self.query.where(column > value)
            if method == '<=':
                self.query = self.query.where(column <= value)
            if method == '<':
                self.query = self.query.where(column < value)
            if method == '!=':
                self.query = self.query.where(column != value)

    async def apply_paginate(self):
        pagination = json.loads(
            self.request.query_params.get(
                'pagination',
                '{"page": 1, "limit": 10}'))

        page = pagination.get('page')
        limit = pagination.get('limit')
        count = await self.db.func.count(self.model.id).gino.scalar()
        offset = (page - 1) * limit

        self.query = self.query.limit(limit).offset(offset)
        self.pages = count // limit
        if count % limit != 0:
            self.pages = self.pages + 1

    async def get(self, request):
        self.request = request
        self.query = self.model.query.order_by(asc(self.model.id))
        await self.apply_paginate()
        await self.apply_filters()

        items = await self.query.gino.all()

        return JSONResponse({
            'success': True,
            'items': self.schema(many=True).dump(items),
            'pages': self.pages
        })

    async def post(self, request):

        data = await request.json()
        item = await self.model.create(**data)

        return JSONResponse({
            'success': True,
            'item': self.schema().dump(item)
        })
