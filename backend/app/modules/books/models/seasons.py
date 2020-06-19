from app.core.database import db


class Season(db.Model):
    __tablename__ = 'seasons'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['book_id'],
            ['books.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Unicode())
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
