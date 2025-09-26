import Menu from "../models/menuModel.js"
import cloudinary from "../utils/cloudinary.js"

export const getMenus = async (req, res) => {
  const category = req.query?.category
  try {
    let menus
    if (!category) {
      menus = await Menu.find()
    } else {
      menus = await Menu.find({ category })
    }
    console.log(menus)
    return res
      .status(200)
      .json({ message: "Get menu successfull", data: { menus } })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const addMenu = async (req, res) => {
  const { name, price, category, description } = req.body
  const image = req.file
  try {
    const menu = await Menu.findOne({ name })
    if (menu) {
      return res
        .status(400)
        .json({ message: "Menu already exists", errors: {} })
    }

    const newMenu = await Menu.create({
      name,
      price,
      category,
      description,
      image: {
        url: image.secure_url,
        cloudinary_id: image.public_id,
      },
    })

    return res
      .status(201)
      .json({ message: "Menu created successfully", data: { menu: newMenu } })
  } catch (error) {
    console.log("Error in addMenu", error)
    await cloudinary.uploader.destroy(image.filename)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const updateMenu = async (req, res) => {
  const { name, price, category, description } = req.body
  const image = req.file
  const id = req.params.menuId
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "Menu id is required", errors: {} })
    }

    const existingMenu = await Menu.findOne({ name })
    if (existingMenu && existingMenu._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "Name already exists", errors: {} })
    }

    const menu = await Menu.findById(id)
    if (!menu) {
      return res.status(404).json({ message: "Menu not found", errors: {} })
    }

    const oldCloudinary_id = menu.image.cloudinary_id

    menu.name = name
    menu.price = price
    menu.category = category
    menu.description = description
    if (image) {
      menu.image = {
        url: image.secure_url,
        cloudinary_id: image.public_id,
      }
    }

    const updatedMenu = await menu.save()
    if (image) {
      await cloudinary.uploader.destroy(oldCloudinary_id)
    }

    return res.status(200).json({
      message: "Edit menu successfully",
      data: { menu: updatedMenu },
    })
  } catch (error) {
    console.log("Error in updateMenu", error)
    if (image) {
      await cloudinary.uploader.destroy(image.public_id)
    }
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}

export const deleteMenu = async (req, res) => {
  const id = req.params.menuId
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "Menu id is required", errors: {} })
    }

    const deletedMenu = await Menu.findByIdAndDelete(id)
    await cloudinary.uploader.destroy(deletedMenu.image.cloudinary_id)
    res.status(200).json({
      message: "Delete menu successfully",
      data: { menu: deletedMenu },
    })
  } catch (error) {
    console.log("Error in deleteMenu", error)
    return res
      .status(500)
      .json({ message: "Internal server error", errors: {} })
  }
}
