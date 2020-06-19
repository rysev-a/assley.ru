from marshmallow import Schema, fields


class GenreSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class TagSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class AuthorSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class TranslatorSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class PainterSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class PublisherSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class SectionSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class EpisodeSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    season_id = fields.Int()
    pages = fields.Str()


class SeasonSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    book_id = fields.Int()


class BookSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    description = fields.Str()
    painter = fields.Str()
    release_year = fields.Int()

    genres = fields.List(fields.Nested(GenreSchema))
    tags = fields.List(fields.Nested(TagSchema))
    sections = fields.List(fields.Nested(SectionSchema))
    authors = fields.List(fields.Nested(AuthorSchema))
    translators = fields.List(fields.Nested(TranslatorSchema))
    publishers = fields.List(fields.Nested(PublisherSchema))
    painters = fields.List(fields.Nested(PainterSchema))
