import { Search } from "lucide-react"
import Input from "../../../components/Input"
import Table from "../../../components/Table"
import { useState } from "react"

const users = [
  {
    _id: "68149c48088f4ea00fd3d4fd",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
  },
  {
    _id: "68149c48088f4ea00fd3d4fe",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "user",
  },
]

const config = [
  {
    label: "Nama",
    render: (user) => user.name,
  },
  {
    label: "Email",
    render: (user) => user.email,
  },
  {
    label: "Role",
    render: (user) => user.role,
  },
]

function Users() {
  const [search, setSearch] = useState("")
  return (
    <>
      <h1 className="text-2xl font-bold text-green-900">Pengguna</h1>
      <div className="mt-5 max-w-64">
        <form>
          <div className="flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              name={"search"}
              placeholder={"Cari nama pengguna..."}
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 rounded text-white px-4"
            >
              <Search size={18} />
            </button>
          </div>
        </form>
      </div>
      <Table data={users} config={config} />
    </>
  )
}

export default Users
