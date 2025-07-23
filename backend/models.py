from sqlalchemy import Table, Column, Integer, String
from database import metadata

users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("name", String(50)),
    Column("email", String(100)),
    Column("company", String(100)),
)
