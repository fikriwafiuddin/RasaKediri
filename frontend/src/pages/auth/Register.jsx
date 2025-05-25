import { Link } from "react-router-dom"
import Input from "../../components/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { registerUserSchema } from "../../schemas/userSchema"
import { registerUser } from "../../store/thunk/authThunk"
import Spinner from "../../components/Spinner"

const config = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
]

function Register() {
  const { isLoadingRegister } = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerUserSchema),
    mode: "onSubmit",
  })
  const dispatch = useDispatch()
  console.log(errors)

  const onSubmit = (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .catch((backendErrors) => {
        for (const key in backendErrors?.errors) {
          setError(key, { message: backendErrors.errors[key][0] })
        }
      })
  }

  return (
    <div className="bg-green-50 flex justify-center items-start min-h-screen">
      <div className="bg-white w-96 mt-28 p-4 rounded outline-2 outline-green-900 text-green-900">
        <h1 className="text-center font-semibold text-xl">Registrasi</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            {config.map((value) => (
              <Input
                key={value.name}
                {...value}
                {...register(value.name)}
                error={errors[value.name]?.message}
              />
            ))}
          </div>
          <button
            disabled={isLoadingRegister}
            className="w-full bg-green-900 hover:bg-green-800 text-white rounded py-2 mt-5"
            type="submit"
          >
            {isLoadingRegister ? (
              <Spinner size={4} type="secondary" />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/auth/login">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
