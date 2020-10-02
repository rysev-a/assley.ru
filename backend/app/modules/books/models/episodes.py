from app.core.database import db
from sqlalchemy import and_
from ..utils import unzip_episode, remove_episode
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
    number = db.Column(db.Unicode())
    name = db.Column(db.Unicode())
    pages = db.Column(db.JSON)
    translator_id = db.Column(db.Integer, db.ForeignKey('translators.id'))
    season_id = db.Column(db.Integer, db.ForeignKey('seasons.id'))

    @staticmethod
    async def upload(episode, book_id):
        season_number = episode.get('seasonNumber')
        episode_number = episode.get('episodeNumber')
        episode_name = episode.get('episodeName')
        episode_file = episode.get('file')
        translator_id = episode.get('translator_id')

        filename = episode_file.filename
        content = await episode_file.read()

        season = await Season.query.where(
            and_(Season.book_id == book_id, Season.number == season_number)).gino.first()

        if not season:
            season = await Season.create(number=season_number, book_id=book_id)

        upload_data = unzip_episode(content)
        await Episode.create(
            name=episode_name,
            number=episode_number,
            season_id=season.id,
            translator_id=translator_id,
            pages=upload_data,
        )

    def clear(self):
        remove_episode(self.pages.get('uuid'))
