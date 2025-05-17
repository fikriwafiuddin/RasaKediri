import User from "../models/userModel.js"

const verifyUser = async (req, res, next) => {
  const id = req.id
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (user.role !== "user") {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
        errors: {},
      })
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export default verifyUser
