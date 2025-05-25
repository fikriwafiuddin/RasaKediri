import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../../../components/Input"
import { Link, useNavigate } from "react-router-dom"
import Textarea from "../../../components/Textarea"
import { orderSchema } from "../../../schemas/orderSchema"
import { axiosAuthInstance } from "../../../utils/axios"
import { useState } from "react"
import Spinner from "../../../components/Spinner"

const config = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
  },
]

function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(orderSchema),
    mode: "onSubmit",
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await axiosAuthInstance.post("/order/createOrder", data)
      navigate("/payment-success")
    } catch (error) {
      console.log(error)
      for (const key in error?.errors) {
        setError(key, { message: error.errors[key][0] })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-green-50 min-h-screen flex items-start justify-center px-1">
      <div className="relative outline-2 outline-green-900 bg-white text-green-900 p-4 mt-24 w-96 rounded">
        <Link
          className="absolute -top-6 left-0 text-sm font-semibold hover:underline"
          to={"/"}
        >
          {"<<"} back
        </Link>
        <h1 className="text-center font-bold text-2xl mb-4">Chekout</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            {config.map((item) =>
              item.type === "textarea" ? (
                <Textarea key={item.name} {...item} {...register(item.name)} />
              ) : (
                <Input
                  key={item.name}
                  {...item}
                  {...register(item.name)}
                  error={errors[item.name]?.message}
                />
              )
            )}
          </div>
          <button
            disabled={isLoading}
            className="w-full bg-green-900 hover:bg-green-800 text-white rounded py-2 mt-4"
            type="submit"
          >
            {isLoading ? <Spinner size={4} type="secondary" /> : "Checkout"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout
