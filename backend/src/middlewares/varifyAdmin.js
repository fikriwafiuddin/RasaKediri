import User from "../models/userModel.js"

const verifyAdmin = async (req, res, next) => {
  const id = req.id
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: "User not found", errors: {} })
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied", errors: {} })
    }
    req.user = user
    next()
  } catch (error) {
    console.log("Error in verifyAdmin", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export default verifyAdmin
