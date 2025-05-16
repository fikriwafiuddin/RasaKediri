function Table({ config, data, action }) {
  return (
    <div className="overflow-hidden bg-white shadow rounded mt-5">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-green-900 text-white">
            <tr>
              {config.map((item) => (
                <th className="text-left text-sm px-6 py-3">{item.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row._id}>
                {config.map((col) => (
                  <td
                    key={col.label + row._id}
                    className="text-left text-sm px-6 py-3 whitespace-nowrap"
                  >
                    {col.render(row, action)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
