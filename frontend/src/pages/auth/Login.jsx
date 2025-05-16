import { Link } from "react-router-dom"
import Input from "../../components/Input"
import { useState } from "react"

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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  return (
    <div className="bg-green-50 flex justify-center items-start min-h-screen">
      <div className="bg-white w-96 mt-28 p-4 rounded outline-2 outline-green-900 text-green-900">
        <h1 className="text-center font-semibold text-xl">Login</h1>
        <form>
          <div className="space-y-2">
            {config.map((value) => (
              <Input
                {...value}
                value={formData[value.name]}
                onChange={(e) =>
                  setFormData(...formData, { [value.name]: e.target.value })
                }
              />
            ))}
          </div>
          <button
            className="w-full bg-green-900 hover:bg-green-800 text-white rounded py-2 mt-5"
            type="button"
          >
            Login
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
