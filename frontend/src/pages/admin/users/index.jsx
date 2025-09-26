import { Search } from "lucide-react"
import Input from "../../../components/Input"
import Table from "../../../components/Table"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../../../components/Spinner"
import { getUserByName, getUsers } from "../../../store/thunk/userThunk"

const config = [
  {
    label: "Name",
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
  const { users, isLoadingGetUsers } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!search) dispatch(getUsers())
  }, [dispatch, search])

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(getUserByName(search))
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-green-900">Users</h1>
      <div className="mt-5 max-w-64">
        <form onSubmit={handleSearch}>
          <div className="flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              name={"search"}
              placeholder={"search username..."}
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
      {isLoadingGetUsers ? (
        <Spinner size={12} />
      ) : users.length === 0 ? (
        <p className="text-center text-xl">Users not found</p>
      ) : (
        <Table data={users} config={config} />
      )}
    </>
  )
}

export default Users
