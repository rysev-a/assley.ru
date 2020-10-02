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
    number = fields.Str()
    translator_id = fields.Int()
    season_id = fields.Int()
    pages = fields.Str()


class SeasonSchema(Schema):
    id = fields.Int()
    number = fields.Str()
    book_id = fields.Int()


class AgeLimit(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        return str(value).replace('AgeLimit.', '')

    def _deserialize(self, value, attr, data, **kwargs):
        return value


class AgeLimit(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        return str(value).replace('AgeLimit.', '')

    def _deserialize(self, value, attr, data, **kwargs):
        return value


class TranslationStatus(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        return str(value).replace('TranslationStatus.', '')

    def _deserialize(self, value, attr, data, **kwargs):
        return value


class ReleaseFormat(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        return str(value).replace('ReleaseFormat.', '')

    def _deserialize(self, value, attr, data, **kwargs):
        return valu


class BookSchema(Schema):
    id = fields.Int()
    rus_title = fields.Str()
    eng_title = fields.Str()
    description = fields.Str()
    painter = fields.Str()
    cover_image = fields.Str()
    release_year = fields.Int()

    genres = fields.List(fields.Nested(GenreSchema))
    tags = fields.List(fields.Nested(TagSchema))
    sections = fields.List(fields.Nested(SectionSchema))
    authors = fields.List(fields.Nested(AuthorSchema))
    translators = fields.List(fields.Nested(TranslatorSchema))
    publishers = fields.List(fields.Nested(PublisherSchema))
    painters = fields.List(fields.Nested(PainterSchema))
    age_limit = AgeLimit()
    translation_status = TranslationStatus()
