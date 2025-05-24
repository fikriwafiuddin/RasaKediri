import LatestOrders from "./LatestOrders"
import Stats from "./Stats"
import TopMenu from "./TopMenu"
import { formatCurrency, formatDate } from "../../../utils/formatters"
import StatusBadge from "../../../components/StatusBadge"
import { useEffect, useState } from "react"
import { axiosAuthInstance } from "../../../utils/axios"

const config = [
  {
    label: "Nama",
    render: (order) => order.name,
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
    render: (order) => formatDate(order.createdAt),
  },
]

function Dashboard() {
  const [isLoadingGetStats, setIsLoadingGetStats] = useState(false)
  const [stats, setStats] = useState({})
  const [isLoadingGetTopMenus, setIsLoadingGetTopMenus] = useState(true)
  const [topMenus, setTopMenus] = useState([])
  const [isLoadingGetLatestOrders, setIsLoadingGetLatestOrders] = useState(true)
  const [latestOrders, setLatestOrders] = useState([])

  useEffect(() => {
    const getStats = async () => {
      setIsLoadingGetStats(true)
      try {
        const response = await axiosAuthInstance.get("/stats/getStats")
        return setStats(response.data.data.stats)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingGetStats(false)
      }
    }
    getStats()
  }, [])

  useEffect(() => {
    const getTopMenus = async () => {
      try {
        setIsLoadingGetTopMenus(true)
        const response = await axiosAuthInstance.get("/stats/getTopMenus")
        return setTopMenus(response.data.data.topMenus)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingGetTopMenus(false)
      }
    }
    getTopMenus()
  }, [])

  useEffect(() => {
    const getLatestOrders = async () => {
      setIsLoadingGetLatestOrders(true)

      try {
        const response = await axiosAuthInstance.get("/stats/getLatestOrders")
        return setLatestOrders(response.data.data.latestOrders)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingGetLatestOrders(false)
      }
    }
    getLatestOrders()
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold text-green-900">Dashboard</h1>
      <Stats stats={stats} isLoading={isLoadingGetStats} />
      <TopMenu menus={topMenus} isLoading={isLoadingGetTopMenus} />
      <LatestOrders
        orders={latestOrders}
        config={config}
        isLoading={isLoadingGetLatestOrders}
      />
    </>
  )
}

export default Dashboard
