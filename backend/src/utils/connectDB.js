import mongoose from "mongoose"

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error))
}

export default connectDB
