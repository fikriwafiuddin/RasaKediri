import LatestOrders from "./LatestOrders"
import Stats from "./Stats"
import TopMenu from "./TopMenu"
import { formatCurrency, formatDate } from "../../../utils/formatters"
import StatusBadge from "../../../components/StatusBadge"

const config = [
  {
    label: "Nama",
    render: (order) => order.user.name,
  },
  {
    label: "Total",
    render: (order) => formatCurrency(order.amount),
  },
  {
    label: "Status",
    render: (order) => <StatusBadge status={order.status} />,
  },
  {
    label: "Tanggal",
    render: (order) => formatDate(order.createAt),
  },
]

const latesOrders = [
  {
    _id: 1,
    user: {
      name: "John Doe",
    },
    amount: 100000,
    status: "pending",
    createAt: "2023-02-20T14:30:00.000Z",
  },
  {
    _id: 2,
    user: {
      name: "Jane Doe",
    },
    amount: 200000,
    status: "processing",
    createAt: "2023-02-20T14:30:00.000Z",
  },
  {
    _id: 3,
    user: {
      name: "John Doe",
    },
    amount: 300000,
    status: "shipped",
    createAt: "2023-02-20T14:30:00.000Z",
  },
  {
    _id: 4,
    user: {
      name: "Jane Doe",
    },
    amount: 400000,
    status: "delivered",
    createAt: "2023-02-20T14:30:00.000Z",
  },
  {
    _id: 5,
    user: {
      name: "John Doe",
    },
    amount: 500000,
    status: "cancelled",
    createAt: "2023-02-20T14:30:00.000Z",
  },
]

function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold text-green-900">Dashboard</h1>
      <Stats />
      <TopMenu />
      <LatestOrders orders={latesOrders} config={config} />
    </>
  )
}

export default Dashboard
