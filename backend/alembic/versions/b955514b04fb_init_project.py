"""Init project

Revision ID: b955514b04fb
Revises: 85d34da7d9a2
Create Date: 2020-06-11 14:06:22.952939

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b955514b04fb'
down_revision = '85d34da7d9a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'books_genres', 'books', ['book_id'], ['id'])
    op.create_foreign_key(None, 'books_genres', 'genres', ['genre_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'books_genres', type_='foreignkey')
    op.drop_constraint(None, 'books_genres', type_='foreignkey')
    # ### end Alembic commands ###
