import json
from sqlalchemy import desc, asc, or_
from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse
from app.core.database import db

from .books import BookList
from ..models import (
    Genre, BookGenreAssocciation,
    Tag, BookTagAssocciation,
)


class BookSearch(BookList):

    async def get(self, request):
        self.where = False
        self.request = request
        self.query = self.model.query.order_by(asc(self.model.id))
        await self.apply_filters()
        await self.apply_paginate()

        items = await self.query.gino.all()

        return JSONResponse({
            'success': True,
            'items': self.schema(many=True).dump(items),
            'pages': self.pages
        })

    async def apply_paginate(self):
        pagination = json.loads(
            self.request.query_params.get(
                'pagination',
                f'{{"page": 1, "limit": {self.limit} }}'))

        page = pagination.get('page')
        limit = pagination.get('limit')

        if self.where != False:
            count = await (db.select([db.func.count()])
                           .where(self.where)
                           .gino
                           .scalar())
        else:
            count = await self.db.func.count(self.model.id).gino.scalar()

        offset = (page - 1) * limit

        self.query = self.query.limit(limit).offset(offset)
        self.pages = count // limit
        if count % limit != 0:
            self.pages = self.pages + 1

    async def apply_filters(self):
        '''
            Apply filters for items
            example url site.com/api/users?filters=[
                {"key": "nickname", "operator": "==", "value": "leonardo"}
            ]
          '''

        filters = json.loads(
            self.request.query_params.get('filters', '[]'))

        for book_filter in filters:
            if book_filter.get('key') == 'tags' and len(book_filter.get('value')):
                filter_tags = book_filter.get('value')

                association_tags_book_id = [assoc.book_id for assoc in await BookTagAssocciation.query.where(
                    BookTagAssocciation.tag_id.in_(filter_tags)
                ).gino.all()]

                where = self.model.id.in_(association_tags_book_id)

                if self.where != False:
                    self.where = or_(self.where, where)
                else:
                    self.where = where

            if book_filter.get('key') == 'genres' and len(book_filter.get('value')):
                filter_genres = book_filter.get('value')

                association_genres_book_id = [assoc.book_id for assoc in await BookGenreAssocciation.query.where(
                    BookGenreAssocciation.genre_id.in_(filter_genres)
                ).gino.all()]

                where = self.model.id.in_(association_genres_book_id)

                if self.where != False:
                    self.where = or_(self.where, where)
                else:
                    self.where = where

        self.query = self.query.where(self.where)
