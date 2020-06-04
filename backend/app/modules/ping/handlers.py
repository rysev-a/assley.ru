from starlette.responses import JSONResponse


async def ping(request):
    return JSONResponse({"pong": 1})
