"use client"

import { useState } from "react"

export default function AddUserForm({setRefreshKey}) {
  const [form, setForm] = useState({
    username: "",
    company: "",
    email: ""
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
    setSuccess("")
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const { username, company, email } = form

    if (!username || !company || !email) {
      setError("All fields are required.")
      return
    }

    try {
      const res = await fetch("http://localhost:8000/api/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          company: company,
          email: email,
        })
      })

      if (!res.ok) throw new Error("Failed to add user.")

      setSuccess("User added successfully!")
      setRefreshKey((key)=>key+1)
      setForm({ username: "", company: "", email: "" })
    } catch (err) {
      setError(err.message || "Something went wrong.")
    }
  }

  return (
   <form onSubmit={handleSubmit} className="add-user-form">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <button type="submit">Add</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  )
}
