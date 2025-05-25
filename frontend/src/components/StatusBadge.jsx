function StatusBadge({ status }) {
  let color = ""
  switch (status) {
    case "pending":
      color = "bg-yellow-600"
      break
    case "processing":
      color = "bg-orange-600"
      break
    case "shipped":
      color = "bg-green-600"
      break
    case "delivered":
      color = "bg-blue-600"
      break
    case "cancelled":
      color = "bg-red-600"
      break
  }
  return (
    <span
      className={`${color} px-3 py-1 rounded text-xs font-semibold text-white`}
    >
      {status}
    </span>
  )
}

export default StatusBadge
