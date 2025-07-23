"use client"

export default function SearchBar({props}){
    const {search, setSearch, setPage} = props
    const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }
  return <>
    <input className="search-bar"
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by name..."
      />
  </>
}