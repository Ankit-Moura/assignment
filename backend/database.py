from databases import Database
from sqlalchemy import create_engine, MetaData
from dotenv import load_dotenv
import os

load_dotenv(".env.dev")
DB_USER = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_HOST = os.getenv("POSTGRES_HOST", "localhost")
DB_PORT = os.getenv("POSTGRES_PORT", "5432")
DB_NAME = os.getenv("POSTGRES_DB")

DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

database = Database(DATABASE_URL)
metadata = MetaData()
engine = create_engine(str(DATABASE_URL).replace("+asyncpg", ""))
