from marshmallow import Schema, fields


class AccountSchema(Schema):
    id = fields.Int()
    email = fields.Str()
    nickname = fields.Str()
