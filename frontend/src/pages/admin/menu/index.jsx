import { Pencil, Trash2 } from "lucide-react"
import Table from "../../../components/Table"
import { useState } from "react"
import FormMenu from "./FormMenu"

const config = [
  {
    label: "Nama",
    render: (data) => data.name,
  },
  {
    label: "Harga",
    render: (data) =>
      data.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
  },
  {
    label: "Terjual",
    render: (data) => data.terjual.toLocaleString(),
  },
  {
    label: "Aksi",
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
          onClick={() => action.delete(data._id)}
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white p-1 rounded"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
]

const data = [
  {
    _id: "1",
    name: "Nasi Goreng Spesial",
    price: 18000,
    terjual: 100,
    description: "Nasi goreng dengan telur dan ayam suwir",
    image: "/images/Ayam geprek.jpg",
  },
  {
    _id: "2",
    name: "Mie Ayam Bakso",
    price: 20000,
    terjual: 50,
    description: "Mie ayam lengkap dengan bakso dan sayur",
    image: "/images/nasigoreng.jpg",
  },
]

function Menu() {
  const [openForm, setOpenForm] = useState(false)
  const [selectedFood, setSelectedFood] = useState(null)

  const action = {
    edit: (id) => {
      setSelectedFood(id)
      setOpenForm(true)
    },
    delete: (id) => console(id),
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-green-900">Menu</h1>

      {openForm && (
        <button
          onClick={() => {
            setOpenForm(false)
            setSelectedFood(null)
          }}
          className="text-xs font-semibold text-green-900 hover:underline mt-5"
          type="button"
        >
          {"<<"} kembali
        </button>
      )}

      {openForm && <FormMenu food={selectedFood} />}

      <div className={openForm && "hidden"}>
        <div className="flex justify-between flex-col lg:flex-row items-start gap-2 mt-5">
          <button
            type="button"
            className="rounded bg-green-900 text-white hover:bg-green-800 px-4 py-1 font-semibold"
            onClick={() => setOpenForm(true)}
          >
            Tambah menu +
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              className="outline-2 outline-green-900 text-green-900 rounded px-4 py-1 font-semibold hover:bg-green-900 hover:text-white duration-200"
            >
              Makanan
            </button>
            <button
              type="button"
              className="outline-2 outline-green-900 text-green-900 rounded px-4 py-1 font-semibold hover:bg-green-900 hover:text-white duration-200"
            >
              Minuman
            </button>
          </div>
        </div>
        <Table data={data} config={config} action={action} />
      </div>
    </div>
  )
}

export default Menu
