import Spinner from "../../../components/Spinner"
import { formatCurrency } from "../../../utils/formatters"

function Stats({ stats, isLoading }) {
  console.log(stats)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-5">
      <div className="text-green-900 border-2 border-green-900 rounded p-4">
        <h2 className="font-bold text-xl">Users</h2>
        {isLoading ? (
          <Spinner size={4} />
        ) : (
          <p className="font-semibold">{stats.totalUsers}</p>
        )}
      </div>
      <div className="text-green-900 border-2 border-green-900 rounded p-4">
        <h2 className="font-bold text-xl">Orders</h2>
        {isLoading ? (
          <Spinner size={4} />
        ) : (
          <p className="font-semibold">{stats.totalOrders}</p>
        )}
      </div>
      <div className="text-green-900 border-2 border-green-900 rounded p-4">
        <h2 className="font-bold text-xl">Menus</h2>
        {isLoading ? (
          <Spinner size={4} />
        ) : (
          <p className="font-semibold">{stats.totalMenus}</p>
        )}
      </div>
      <div className="text-green-900 border-2 border-green-900 rounded p-4">
        <h2 className="font-bold text-xl">Revenue</h2>
        {isLoading ? (
          <Spinner size={4} />
        ) : (
          <p className="font-semibold">
            {formatCurrency(stats.totalRevenue || 0)}
          </p>
        )}
      </div>
    </div>
  )
}

export default Stats
