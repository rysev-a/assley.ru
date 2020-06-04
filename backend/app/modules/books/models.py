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
