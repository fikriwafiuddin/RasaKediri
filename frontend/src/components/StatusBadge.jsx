function StatusBadge({ status }) {
  let color = ""
  let text = ""
  switch (status) {
    case "pending":
      color = "bg-yellow-600"
      text = "Menunggu"
      break
    case "processing":
      color = "bg-orange-600"
      text = "Diproses"
      break
    case "shipped":
      color = "bg-green-600"
      text = "Dikirim"
      break
    case "delivered":
      color = "bg-blue-600"
      text = "Selesai"
      break
    case "cancelled":
      color = "bg-red-600"
      text = "Dibatalkan"
      break
  }
  return (
    <span
      className={`${color} px-3 py-1 rounded text-xs font-semibold text-white`}
    >
      {text}
    </span>
  )
}

export default StatusBadge
