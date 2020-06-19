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
