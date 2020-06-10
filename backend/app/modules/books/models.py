from app.core.database import db

books_mock = [
    {
        "title": "book title",
        "author": "book author",
        "description": "book description",
        "painter": "book painter",
        "release_year": 2000,
    },
    {
        "title": "book title 2",
        "author": "book author 2",
        "description": "book description 2",
        "painter": "book painter 2",
        "release_year": 2000,
    },
    {
        "title": "book title 3",
        "author": "book author 3",
        "description": "book description 3",
        "painter": "book painter 3",
        "release_year": 2000,
    },
    {
        "title": "book title 4",
        "author": "book author 4",
        "description": "book description 4",
        "painter": "book painter 4",
        "release_year": 2000,
    },
    {
        "title": "book title 5",
        "author": "book author 5",
        "description": "book description 5",
        "painter": "book painter 5",
        "release_year": 2000,
    },
]


class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer(), primary_key=True)

    title = db.Column(db.Unicode())
    author = db.Column(db.Unicode())
    description = db.Column(db.Unicode())
    painter = db.Column(db.Unicode())
    release_year = db.Column(db.Integer())


class Genre(db.Model):
    __tablename__ = 'genres'

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Unicode())


books_genres_association = db.Table(
    'books_projects', db,
    db.Column('book_id', db.Integer, db.ForeignKey('books.id')),
    db.Column('genre_id', db.Integer, db.ForeignKey('genres.id'))
)

# class BookGenreAssocciation(db.Model):
#     __tablename__ = 'books_genres'
