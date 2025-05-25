import { Pencil, Trash2 } from "lucide-react"
import Table from "../../../components/Table"
import { useEffect, useState } from "react"
import FormMenu from "./FormMenu"
import { useDispatch, useSelector } from "react-redux"
import { deleteMenu, getMenus } from "../../../store/thunk/menuThunk"
import Spinner from "../../../components/Spinner"
import { setCategory } from "../../../store/slices/menuSlice"
import Confirm from "../../../components/Confirm"

const config = [
  {
    label: "Name",
    render: (data) => data.name,
  },
  {
    label: "Price",
    render: (data) =>
      data.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
  },
  {
    label: "Sold",
    render: (data) => data.sold.toLocaleString(),
  },
  {
    label: "Action",
    render: (data, action) => (
      <div className="flex gap-2">
        <button
          onClick={() => action.edit(data)}
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => action.delete(data)}
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white p-1 rounded"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
]

function Menu() {
  const [openForm, setOpenForm] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const { menus, isLoadingGetMenus, category, isLoadingDeleteMenu } =
    useSelector((state) => state.menu)
  const [selectedFood, setSelectedFood] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMenus(category))
  }, [dispatch, category])

  const action = {
    edit: (menu) => {
      setSelectedFood(menu)
      setOpenForm(true)
    },
    delete: (menu) => {
      setOpenConfirm(true)
      setSelectedFood(menu)
    },
  }

  const handleChangeCategory = (value) => {
    dispatch(setCategory(value))
  }

  const handleDeleteMenu = () => {
    dispatch(deleteMenu(selectedFood._id))
      .unwrap()
      .finally(() => {
        setSelectedFood(null)
        setOpenConfirm(false)
      })
  }

  return (
    <div>
      <Confirm
        isOpen={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        message={`Are you sure you want to delete the ${selectedFood?.name} menu?`}
        onConfirm={handleDeleteMenu}
        isLoading={isLoadingDeleteMenu}
      />

      <h1 className="text-2xl font-bold text-green-900">Menus</h1>

      {openForm && (
        <button
          onClick={() => {
            setOpenForm(false)
            setSelectedFood(null)
          }}
          className="text-xs font-semibold text-green-900 hover:underline mt-5"
          type="button"
        >
          {"<<"} back
        </button>
      )}

      {openForm && <FormMenu food={selectedFood} setOpenForm={setOpenForm} />}

      <div className={openForm && "hidden"}>
        <div className="flex justify-between flex-col lg:flex-row items-start gap-2 mt-5">
          <button
            type="button"
            className="rounded bg-green-900 text-white hover:bg-green-800 px-4 py-1 font-semibold"
            onClick={() => setOpenForm(true)}
          >
            Add menu +
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleChangeCategory("food")}
              type="button"
              className={`outline-2 outline-green-900 text-green-900 rounded px-4 py-1 font-semibold hover:bg-green-900 hover:text-white duration-200 ${
                category === "food" && "bg-green-900 text-white"
              }`}
            >
              Food
            </button>
            <button
              onClick={() => handleChangeCategory("beverage")}
              type="button"
              className={`outline-2 outline-green-900 text-green-900 rounded px-4 py-1 font-semibold hover:bg-green-900 hover:text-white duration-200 ${
                category === "beverage" && "bg-green-900 text-white"
              }`}
            >
              Beverage
            </button>
          </div>
        </div>
        {isLoadingGetMenus ? (
          <Spinner size={12} />
        ) : menus.length === 0 ? (
          <p className="text-center text-xl">Orders not found</p>
        ) : (
          <Table data={menus} config={config} action={action} />
        )}
      </div>
    </div>
  )
}

export default Menu
