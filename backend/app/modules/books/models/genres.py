from app.core.database import db


class Genre(db.Model):
    __tablename__ = 'genres'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Unicode(), unique=True)

    def __init__(self, **kw):
        super().__init__(**kw)
        self._books = set()

    @property
    def books(self):
        return self._books
