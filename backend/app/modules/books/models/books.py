import enum
from sqlalchemy import Enum
from app.core.database import db


class ReleaseFormat(enum.Enum):
    color = 1
    web = 2
    sigle = 3
    compilation = 4
    doujinshi = 5


class AgeLimit(enum.Enum):
    unlimited = 1
    sixteen = 2
    eighteen = 3


class TranslationStatus(enum.Enum):
    complete = 1
    processing = 2
    frozen = 3
    no_translator = 4


class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.Unicode())
    description = db.Column(db.Unicode())
    release_year = db.Column(db.Integer())
    cover_image = db.Column(db.Unicode())
    background_image = db.Column(db.Unicode())

    # enum props
    age_limit = db.Column(Enum(
        AgeLimit),  nullable=False, default=AgeLimit.unlimited)
    translation_status = db.Column(
        Enum(TranslationStatus), nullable=False,  default=TranslationStatus.processing)
    release_format = db.Column(
        Enum(ReleaseFormat), nullable=False, default=ReleaseFormat.web)

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
