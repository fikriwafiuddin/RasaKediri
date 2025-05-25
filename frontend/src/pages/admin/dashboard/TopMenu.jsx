function TopMenu({ menus, isLoading }) {
  const skeletonMenus = Array(4).fill(0)

  return (
    <div className="mt-5 text-green-900">
      <h2 className="font-semibold text-xl text-green-900">Top Menus</h2>
      <div className="flex gap-4 mt-3 overflow-y-auto">
        {isLoading
          ? skeletonMenus.map((_, index) => (
              <div
                key={index}
                className="flex gap-2 bg-white p-4 rounded shadow shrink-0 animate-pulse"
              >
                <div className="w-28 h-20 bg-gray-200 rounded"></div>
                <div className="flex flex-col justify-between py-1">
                  <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          : menus?.map((menu) => (
              <div
                key={menu._id}
                className="flex gap-2 bg-white p-4 rounded shadow shrink-0"
              >
                <img
                  src={menu.image?.url}
                  alt={menu.name}
                  className="w-28 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-sm">{menu.name}</h3>
                  <p className="text-xs">Sold {menu.sold}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default TopMenu
