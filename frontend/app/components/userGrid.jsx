"use client"

import { useEffect, useState } from "react"


function UserGridSkeleton() {
  return (
    <div className="user-grid-container">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="user-grid-card skeleton-card" key={i}></div>
      ))}
    </div>
  );
}

export default function UserGrid({props}) {
  const {refreshKey, search, setPage, page} = props;
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    const start = performance.now();
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "5",
        ...(search && { search })
      })

      const res = await fetch(`http://localhost:8000/api/users?${query}`)
      if (!res.ok) throw new Error("Failed to fetch users")
      const data = await res.json()
      setUsers(data.results)
      setHasNext(data.has_next)
      setHasPrev(data.has_prev)
    } catch (err) {
      setError(err.message || "Unexpected error")
    } finally {
    const elapsed = performance.now() - start;
    const minDelay = 500; // in ms
    const remaining = Math.max(minDelay - elapsed, 0);

    setTimeout(() => setLoading(false), remaining);
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page, search, refreshKey])

  

  const handlePrev = () => {
    if (hasPrev && page > 1) setPage(page - 1)
  }

  const handleNext = () => {
    if (hasNext) setPage(page + 1)
  }

  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    loading ? <UserGridSkeleton /> :
    <div className="user-grid">
      <div className="paginator-container">
        <button
          className="prev-btn"
          data-label="Prev"
          onClick={handlePrev}
          disabled={!hasPrev}
        ></button>

        <span>Page : {page}</span>

        <button
          className="next-btn"
          data-label="Next"
          onClick={handleNext}
          disabled={!hasNext}
        ></button>
      </div>
      <div className="user-grid-container">
        {users.map(user => (
          <div className="user-grid-card" key={user.id}>
            <h3>{user.name}</h3>
            <p >{user.email}</p>
            <p >{user.company}</p>
          </div>
        ))}
      </div>

      
    </div>
  )
}
