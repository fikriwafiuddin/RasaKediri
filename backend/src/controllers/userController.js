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

export const getUserByName = async (req, res) => {
  const name = req.params?.name
  try {
    if (!name) {
      return res.status(400).json({
        message: "User name is required",
        errors: { name: ["User name is required"] },
      })
    }

    const users = await User.find({
      name: { $regex: name, $options: "i" }, // "i" => ignore case
    }).select("-password")
    return res
      .status(200)
      .json({ message: "User retrieved successfully", data: { users } })
  } catch (error) {
    console.log("Error in getUserByName", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}
