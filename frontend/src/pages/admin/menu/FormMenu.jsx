import { useState } from "react"
import Input from "../../../components/Input"
import Textarea from "../../../components/Textarea"
import { X } from "lucide-react"

const config = [
  {
    name: "name",
    label: "Nama",
    type: "text",
  },
  {
    name: "price",
    label: "Harga",
    type: "number",
  },
  {
    name: "description",
    label: "Deskripsi",
    type: "textarea",
  },
  {
    name: "image",
    label: "Gambar",
    type: "file",
  },
]

function FormMenu({ food }) {
  const [formData, setFormData] = useState({
    name: food?.name || "",
    price: food?.price || "",
    description: food?.description || "",
    image: food?.image || null,
  })
  const [newImage, setNewImage] = useState(null)

  return (
    <div className="max-w-xl">
      <form>
        <div className="space-y-2">
          {config.map((item) => {
            if (item.type === "textarea") {
              return (
                <Textarea
                  key={item.name}
                  {...item}
                  value={formData[item.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [item.name]: e.target.value })
                  }
                />
              )
            }
            if (item.type === "file") {
              return (
                <Input
                  key={item.name}
                  {...item}
                  value={newImage}
                  onChange={(e) => {
                    setNewImage(e.target.files[0])
                  }}
                />
              )
            }
            return (
              <Input
                key={item.name}
                {...item}
                value={formData[item.name]}
                onChange={(e) =>
                  setFormData({ ...formData, [item.name]: e.target.value })
                }
              />
            )
          })}
        </div>
        {(food?.image || newImage) && (
          <div className="flex gap-2 items-start mt-3">
            <img
              src={newImage ? URL.createObjectURL(newImage) : food?.image}
              alt="image product"
              className="h-48 rounded"
            />
            {newImage && (
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => setNewImage(null)}
              >
                <X />
              </button>
            )}
          </div>
        )}
        <button
          type="submit"
          className="bg-green-900 hover:bg-green-800 text-white rounded py-2 px-6 mt-4"
        >
          Simpan
        </button>
      </form>
    </div>
  )
}

export default FormMenu
