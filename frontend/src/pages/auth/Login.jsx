import { Link } from "react-router-dom"
import Input from "../../components/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../store/thunk/authThunk"
import { userLoginSchema } from "../../schemas/userSchema"
import Spinner from "../../components/Spinner"

const config = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
]

function Login() {
  const { isLoadingLogin } = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(userLoginSchema),
    mode: "onSubmit",
  })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(loginUser(data))
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
        <h1 className="text-center font-semibold text-xl">Login</h1>
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
            disabled={isLoadingLogin}
            className="w-full bg-green-900 hover:bg-green-800 text-white rounded py-2 mt-5"
            type="submit"
          >
            {isLoadingLogin ? <Spinner size={4} type="secondary" /> : "Login"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Belum punya akun?{" "}
          <Link className="text-blue-500 hover:underline" to="/auth/register">
            Registrasi
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
