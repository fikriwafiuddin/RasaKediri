import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided", errors: {} })

    const splitToken = token.split(" ")
    if (splitToken[0] !== "Bearer" || !splitToken[1])
      return res
        .status(401)
        .json({ message: "Access denied. Invalid token", errors: {} })

    const decoded = jwt.verify(splitToken[1], process.env.SECRET_KEY)
    req.id = decoded.id
    next()
  } catch (error) {
    console.log(error)
    return res
      .status(401)
      .json({ message: "Access denied. Invalid token", errors: {} })
  }
}

export default verifyToken
