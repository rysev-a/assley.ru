import json
from starlette.endpoints import HTTPEndpoint
from starlette.responses import JSONResponse


class DetailResource(HTTPEndpoint):
    model: object
    schema: dict

    async def get(self, request):
        id = request.path_params['id']
        item = await self.model.get(id)

        return JSONResponse({
            'success': True,
            'item': self.schema().dump(item)
        })

    async def delete(self, request):
        id = request.path_params['id']
        item = await self.model.get(id)
        await item.delete()

        return JSONResponse({
            'success': True,
        })

    async def put(self, request):
        id = request.path_params['id']
        item = await self.model.get(id)

        data = await request.json()
        await item.update(**data).apply()

        return JSONResponse({
            'success': True,
            'item': self.schema().dump(item)
        })
