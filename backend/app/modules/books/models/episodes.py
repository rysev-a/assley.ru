from app.core.database import db
from sqlalchemy import and_
from ..utils import unzip_episode
from .seasons import Season


class Episode(db.Model):
    __tablename__ = 'episodes'
    __table_args__ = (
        db.ForeignKeyConstraint(
            ['season_id'],
            ['seasons.id'],
            onupdate="CASCADE", ondelete="CASCADE"
        ),
    )

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Unicode())
    pages = db.Column(db.JSON)
    season_id = db.Column(db.Integer, db.ForeignKey('seasons.id'))

    @staticmethod
    async def upload(episode, book_id):
        season_name = episode.get('seasonNumber')
        episode_number = episode.get('episodeNumber')
        episode_name = episode.get('episodeName')
        episode_file = episode.get('file')

        filename = episode_file.filename
        content = await episode_file.read()

        season = await Season.query.where(
            and_(Season.book_id == book_id, Season.name == season_name)).gino.first()

        if not season:
            season = await Season.create(name=season_name, book_id=book_id)

        upload_data = unzip_episode(content)
        await Episode.create(
            name=f'{episode_number} - {episode_name}',
            season_id=season.id,
            pages=upload_data,
        )
