from starlette.responses import JSONResponse


async def check_unique_name_update(self, request, put, message):
    id = request.path_params['id']
    data = await request.json()
    name = data.get('name')
    item = await self.model.query.where(self.model.name == name).gino.first()
    if item and item.id != id:
        return JSONResponse({
            'success': False,
            'message': {'name': message}
        }, status_code=400)

    response = await put(request)
    return response


async def check_unique_name_create(self, request, post, message):
    data = await request.json()
    name = data.get('name')
    item = await self.model.query.where(self.model.name == name).gino.first()
    if item:
        return JSONResponse({
            'success': False,
            'message': {'name': message}
        }, status_code=400)

    response = await post(request)
    return response
