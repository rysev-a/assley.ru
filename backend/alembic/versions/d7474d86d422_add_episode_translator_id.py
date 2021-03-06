"""Add episode translator id

Revision ID: d7474d86d422
Revises: b6fc08d8af64
Create Date: 2020-09-18 12:15:08.397685

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd7474d86d422'
down_revision = 'b6fc08d8af64'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'books_authors', 'authors', ['author_id'], ['id'])
    op.create_foreign_key(None, 'books_authors', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_genres', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_genres', 'genres', ['genre_id'], ['id'])
    op.create_foreign_key(None, 'books_painters', 'painters', ['painter_id'], ['id'])
    op.create_foreign_key(None, 'books_painters', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_publishers', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_publishers', 'publishers', ['publisher_id'], ['id'])
    op.create_foreign_key(None, 'books_release_formates', 'books', ['book_id'], ['id'])
    op.create_foreign_key(None, 'books_sections', 'sections', ['section_id'], ['id'])
    op.create_foreign_key(None, 'books_sections', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_tags', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_tags', 'tags', ['tag_id'], ['id'])
    op.create_foreign_key(None, 'books_translators', 'books', ['book_id'], ['id'])
    op.create_foreign_key(None, 'books_translators', 'translators', ['translator_id'], ['id'])
    op.add_column('episodes', sa.Column('translator_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'episodes', 'translators', ['translator_id'], ['id'])
    op.drop_column('episodes', 'translator')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('episodes', sa.Column('translator', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'episodes', type_='foreignkey')
    op.drop_column('episodes', 'translator_id')
    op.drop_constraint(None, 'books_translators', type_='foreignkey')
    op.drop_constraint(None, 'books_translators', type_='foreignkey')
    op.drop_constraint(None, 'books_tags', type_='foreignkey')
    op.drop_constraint(None, 'books_tags', type_='foreignkey')
    op.drop_constraint(None, 'books_sections', type_='foreignkey')
    op.drop_constraint(None, 'books_sections', type_='foreignkey')
    op.drop_constraint(None, 'books_release_formates', type_='foreignkey')
    op.drop_constraint(None, 'books_publishers', type_='foreignkey')
    op.drop_constraint(None, 'books_publishers', type_='foreignkey')
    op.drop_constraint(None, 'books_painters', type_='foreignkey')
    op.drop_constraint(None, 'books_painters', type_='foreignkey')
    op.drop_constraint(None, 'books_genres', type_='foreignkey')
    op.drop_constraint(None, 'books_genres', type_='foreignkey')
    op.drop_constraint(None, 'books_authors', type_='foreignkey')
    op.drop_constraint(None, 'books_authors', type_='foreignkey')
    # ### end Alembic commands ###
