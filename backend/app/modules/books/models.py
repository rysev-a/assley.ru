from app.core.database import db


class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.Unicode())
    author = db.Column(db.Unicode())
    description = db.Column(db.Unicode())
    painter = db.Column(db.Unicode())
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


class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Unicode(), unique=True)

    def __init__(self, **kw):
        super().__init__(**kw)
        self._books = set()

    @property
    def books(self):
        return self._books


class Section(db.Model):
    __tablename__ = 'sections'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Unicode(), unique=True)

    def __init__(self, **kw):
        super().__init__(**kw)
        self._books = set()

    @property
    def books(self):
        return self._books


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
                         db.ForeignKey('genres.id')

                         )


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
