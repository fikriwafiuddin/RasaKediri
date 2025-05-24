import { useState } from "react"
import Input from "../../../components/Input"
import Textarea from "../../../components/Textarea"
import { X } from "lucide-react"
import Select from "../../../components/Select"
import { useDispatch, useSelector } from "react-redux"
import { addMenu, updateMenu } from "../../../store/thunk/menuThunk"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { menuSchema } from "../../../schemas/menuSchema"
import Spinner from "../../../components/Spinner"

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
    name: "category",
    label: "Kategori",
    type: "select",
    options: [
      { value: "food", label: "Food" },
      { value: "beverage", label: "Beverage" },
    ],
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

function FormMenu({ food, setOpenForm }) {
  const { isLoading } = useSelector((state) => state.menu)
  const [newImage, setNewImage] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(menuSchema),
    mode: "onSubmit",
    values: {
      name: food?.name || "",
      price: food?.price || "",
      category: food?.category || "",
      description: food?.description || "",
    },
  })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", data.price)
    formData.append("description", data.description)
    formData.append("category", data.category)
    formData.append("image", newImage)
    if (food) {
      dispatch(updateMenu({ id: food._id, data: formData }))
        .unwrap()
        .then(() => {
          setOpenForm(false)
        })
        .catch((backendErrors) => {
          for (const key in backendErrors?.errors) {
            setError(key, { message: backendErrors.errors[key][0] })
          }
        })
    } else {
      dispatch(addMenu(formData))
        .unwrap()
        .then(() => {
          setOpenForm(false)
        })
        .catch((backendErrors) => {
          for (const key in backendErrors?.errors) {
            setError(key, { message: backendErrors.errors[key][0] })
          }
        })
    }
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          {config.map((item) => {
            if (item.type === "textarea") {
              return (
                <Textarea
                  key={item.name}
                  {...item}
                  {...register(item.name)}
                  error={errors[item.name]?.message}
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
            if (item.type === "select") {
              return (
                <Select
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  options={item.options}
                  {...register(item.name)}
                  error={errors[item.name]?.message}
                />
              )
            }
            return (
              <Input
                key={item.name}
                {...item}
                {...register(item.name)}
                error={errors[item.name]?.message}
              />
            )
          })}
        </div>

        {(food?.image || newImage) && (
          <div className="flex gap-2 items-start mt-3">
            <img
              src={newImage ? URL.createObjectURL(newImage) : food?.image.url}
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
          disabled={isLoading}
          type="submit"
          className="bg-green-900 hover:bg-green-800 text-white rounded py-2 px-6 mt-4"
        >
          {isLoading ? <Spinner size={4} type="secondary" /> : "Simpan"}
        </button>
      </form>
    </div>
  )
}

export default FormMenu
