from app.core.database import db


class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.Unicode())
    description = db.Column(db.Unicode())
    release_year = db.Column(db.Integer())
    cover = db.Column(db.Unicode())

    def __init__(self, **kw):
        super().__init__(**kw)
        self._genres = set()
        self._tags = set()

    @property
    def genres(self):
        return self._genres

    def add_genre(self, genre):
        self._genres.add(genre)
        genre._books.add(self)

    @property
    def tags(self):
        return self._tags

    def add_tag(self, tag):
        self._tags.add(tag)
        tag._books.add(self)

    @property
    def sections(self):
        return self._sections

    def add_section(self, section):
        self._sections.add(section)
        section._books.add(self)
