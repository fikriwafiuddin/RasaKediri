export default function FoodCard({ food, selectFood }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <img
        src={food.image}
        alt={food.name}
        className="w-full rounded h-48 object-cover mb-2"
      />
      <h3 className="font-bold text-xl text-green-900">{food.name}</h3>
      <span className="text-green-900">Rp {food.price.toLocaleString()}</span>
      <button
        onClick={() => selectFood(food)}
        type="button"
        className="bg-green-900 hover:bg-green-800 text-white py-2 rounded w-full mt-4"
      >
        Tambah Keranjang
      </button>
    </div>
  )
}
