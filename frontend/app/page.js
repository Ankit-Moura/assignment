"use client"

import UserGrid from "@/app/components/userGrid";
import AddUserForm from "./components/addUser";
import SearchBar from "./components/searchBar";
import { useState } from "react";





export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  return (
    <div className="main-content">
      <h1 style={{ textAlign: "center" }}>User's List</h1>
      <SearchBar props={{search, setSearch, setPage}}/>
      <UserGrid props={{refreshKey, search, page, setPage}} />
      <AddUserForm setRefreshKey={setRefreshKey} />
    </div>
  );
}
