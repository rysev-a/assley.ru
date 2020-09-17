"""Add episode translator

Revision ID: b6fc08d8af64
Revises: 3a5dcd078b7a
Create Date: 2020-09-17 09:59:55.392857

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b6fc08d8af64'
down_revision = '3a5dcd078b7a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'books_authors', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_authors', 'authors', ['author_id'], ['id'])
    op.create_foreign_key(None, 'books_genres', 'genres', ['genre_id'], ['id'])
    op.create_foreign_key(None, 'books_genres', 'books', ['book_id'], ['id'])
    op.create_foreign_key(None, 'books_painters', 'books', ['book_id'], ['id'])
    op.create_foreign_key(None, 'books_painters', 'painters', ['painter_id'], ['id'])
    op.create_foreign_key(None, 'books_publishers', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_publishers', 'publishers', ['publisher_id'], ['id'])
    op.create_foreign_key(None, 'books_release_formates', 'books', ['book_id'], ['id'])
    op.create_foreign_key(None, 'books_sections', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_sections', 'sections', ['section_id'], ['id'])
    op.create_foreign_key(None, 'books_tags', 'tags', ['tag_id'], ['id'])
    op.create_foreign_key(None, 'books_tags', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_translators', 'books', ['book_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.create_foreign_key(None, 'books_translators', 'translators', ['translator_id'], ['id'])
    op.add_column('episodes', sa.Column('translator', sa.Unicode(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('episodes', 'translator')
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
