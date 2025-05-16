import { useState } from "react"
import Input from "../../../components/Input"
import { Link } from "react-router-dom"
import Textarea from "../../../components/Textarea"

const config = [
  {
    name: "name",
    label: "Nama",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "phone",
    label: "Nomor Telepon",
    type: "text",
  },
  {
    name: "address",
    label: "Alamat",
    type: "text",
  },
  {
    name: "notes",
    label: "Catatan",
    type: "textarea",
  },
]

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  return (
    <div className="bg-green-50 min-h-screen flex items-start justify-center px-1">
      <div className="relative outline-2 outline-green-900 bg-white text-green-900 p-4 mt-24 w-96 rounded">
        <Link
          className="absolute -top-6 left-0 text-sm font-semibold hover:underline"
          to={"/"}
        >
          {"<<"} kembali
        </Link>
        <h1 className="text-center font-bold text-2xl mb-4">Chekout</h1>
        <form>
          <div className="space-y-2">
            {config.map((item) =>
              item.type === "textarea" ? (
                <Textarea
                  {...item}
                  value={formData[item.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [item.name]: e.target.value })
                  }
                />
              ) : (
                <Input
                  {...item}
                  value={formData[item.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [item.name]: e.target.value })
                  }
                />
              )
            )}
          </div>
          <button
            className="w-full bg-green-900 hover:bg-green-800 text-white rounded py-2 mt-4"
            type="submit"
          >
            Checkout
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout
