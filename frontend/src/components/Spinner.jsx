function Spinner({ size = 12, type = "primary" }) {
  let color
  switch (type) {
    case "primary":
      color = "border-green-900"
      break
    case "secondary":
      color = "border-white"
      break
  }

  const sizeClass = {
    4: "w-4 h-4",
    8: "w-8 h-8",
    12: "w-12 h-12",
    16: "w-16 h-16",
  }
  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-4 ${sizeClass[size]} ${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  )
}

export default Spinner
