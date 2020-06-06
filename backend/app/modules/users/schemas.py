from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Int()
    email = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()
