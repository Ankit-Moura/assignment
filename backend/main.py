from fastapi import FastAPI, HTTPException, Query, status
from pydantic import BaseModel, EmailStr
from database import database, engine, metadata
from models import users
from contextlib import asynccontextmanager
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, func

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    yield
    await database.disconnect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
metadata.create_all(engine)

class UserSchema(BaseModel):
    name: str 
    email: EmailStr
    company: str

class MultiUserInput(BaseModel):
    users: List[UserSchema]

class UserOpSchema(UserSchema):
    id: int

@app.post("/api/add-user", status_code=status.HTTP_201_CREATED) # to add one user at a time
async def create_user(user:UserSchema):
    query = users.insert().values(name=user.name, email=user.email, company=user.company)
    user_id = await database.execute(query)
    return {"id": user_id, "name": user.name, "email": user.email, "company" :user.company}

@app.post("/api/add-multiple-users", status_code=status.HTTP_201_CREATED) # to add multiple users at once
async def add_multiple_users(payload: MultiUserInput):
    query = users.insert()
    values = [user.model_dump() for user in payload.users]
    if not values:
        raise HTTPException(status_code=400, detail="Empty user list.")
    await database.execute_many(query, values)
    return {"message": f"{len(values)} users added."}

@app.get("/api/users", status_code=status.HTTP_200_OK) # for fetching paginated list of users 
async def list_users(limit:int = Query(5, gt=0),
                    page:int = Query(1, ge=1), search: Optional[str] = Query(None)):
    
    offset = (page - 1) * limit
    user_query = users.select().limit(limit).offset(offset)
    count_query = select(func.count()).select_from(users)

    if search:
        user_query = user_query.where(users.c.name.ilike(f"%{search}%"))
        count_query = count_query.where(users.c.name.ilike(f"%{search}%"))

    # Fetch results and total count
    result = await database.fetch_all(user_query)
    total = await database.fetch_val(count_query)

    return {
        "total": total,
        "limit": limit,
        "page": page,
        "has_next": (offset + limit) < total,
        "has_prev": page > 1,
        "results": result,
    }