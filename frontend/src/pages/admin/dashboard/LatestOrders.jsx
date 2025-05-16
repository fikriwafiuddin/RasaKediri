import Table from "../../../components/Table"

function LatestOrders({ orders, config }) {
  return (
    <div className="mt-5 text-green-900">
      <h2 className="font-semibold text-xl text-green-900">Pesanan Terbaru</h2>
      <Table data={orders} config={config} />
    </div>
  )
}

export default LatestOrders
