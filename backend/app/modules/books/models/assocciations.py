import enum
from sqlalchemy import Enum
from app.core.database import db


class BookGenreAssocciation(db.Model):
    __tablename__ = 'books_genres'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['book_id'],
            ['books.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    genre_id = db.Column(db.Integer,
                         db.ForeignKey('genres.id'))


class BookTagAssocciation(db.Model):
    __tablename__ = 'books_tags'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['book_id'],
            ['books.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'))


class BookSectionAssocciation(db.Model):
    __tablename__ = 'books_sections'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['book_id'],
            ['books.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'))


class BookAuthorAssocciation(db.Model):
    __tablename__ = 'books_authors'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['book_id'],
            ['books.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'))


class BookTranslatorAssocciation(db.Model):
    __tablename__ = 'books_translators'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['book_id'],
            ['books.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    translator_id = db.Column(db.Integer, db.ForeignKey('translators.id'))


class BookPainterAssocciation(db.Model):
    __tablename__ = 'books_painters'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['book_id'],
            ['books.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    painter_id = db.Column(db.Integer, db.ForeignKey('painters.id'))


class BookPublisherAssocciation(db.Model):
    __tablename__ = 'books_publishers'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['book_id'],
            ['books.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    publisher_id = db.Column(db.Integer, db.ForeignKey('publishers.id'))


class ReleaseFormat(enum.Enum):
    color = 1
    web = 2
    sigle = 3
    compilation = 4
    doujinshi = 5


class BookReleaseFormatAssocciation(db.Model):
    __tablename__ = 'books_release_formates'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['book_id'],
            ['books.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    release_format = db.Column(
        Enum(ReleaseFormat), nullable=False, default=ReleaseFormat.web)
