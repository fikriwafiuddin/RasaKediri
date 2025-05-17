import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user)
      return res.status(400).json({
        message: "Email already exists",
        errors: { email: ["Email already exists"] },
      })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name, email, password: hashedPassword })
    const token = generateToken(newUser._id)
    res.status(201).json({
      message: "Register successful",
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      },
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({
        message: "Invalid email or password",
        errors: { email: ["Invalid email or password"] },
      })

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword)
      return res.status(400).json({
        message: "Invalid email or password",
        errors: { password: ["Invalid email or password"] },
      })

    const token = generateToken(user._id)
    return res.status(200).json({
      message: "Login successful",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const getMe = async (req, res) => {
  const id = req.id
  try {
    const user = await User.findById(id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found", errors: {} })
    }

    return res.status(200).json({
      message: "getMe successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}
