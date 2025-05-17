import User from "../models/userModel.js"

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")
    return res
      .status(200)
      .json({ message: "Users retrieved successfully", data: { users } })
  } catch (error) {
    console.log("Error in getUsers", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}
