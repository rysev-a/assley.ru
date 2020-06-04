from starlette.applications import Starlette
from starlette.config import Config

from app.core.routes import routes
from app.core.database import db

config = Config(".env")
config('DATABASE_URL')

app = Starlette(
    routes=routes,
    debug=config('DEBUG', cast=bool, default=False),
)


@app.on_event('startup')
async def startup():
    engine = await db.set_bind(config('DATABASE_URL', cast=str, default=''))
    db.bind = engine


@app.on_event('shutdown')
async def shutdown():
    await db.pop_bind().close()
