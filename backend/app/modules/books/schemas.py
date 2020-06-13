from marshmallow import Schema, fields


class GenreSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class TagSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class SectionSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class BookSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    author = fields.Str()
    description = fields.Str()
    painter = fields.Str()
    release_year = fields.Int()

    genres = fields.List(fields.Nested(GenreSchema))
