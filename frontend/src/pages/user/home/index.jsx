import { useEffect, useState } from "react"
import FoodCard from "./FoodCart"
import AddToCartModal from "./AddToCartModal"
import { useDispatch, useSelector } from "react-redux"
import { getMenus } from "../../../store/thunk/menuThunk"
import Spinner from "../../../components/Spinner"
import { addMenuToCart } from "../../../store/thunk/cartThunk"

export default function Home() {
  const { menus, isLoadingGetMenus } = useSelector((state) => state.menu)
  const { isLoadingAddCart } = useSelector((state) => state.cart)
  const [selectedFood, setSelectedFood] = useState(null)
  const [filterMenu, setFilterMenu] = useState("food")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMenus(filterMenu))
  }, [filterMenu, dispatch])

  const handleAddMenuToCart = (id, quantity) => {
    dispatch(addMenuToCart({ id, quantity })).then(() => setSelectedFood(null))
  }

  return (
    <>
      <section
        className="relative bg-cover bg-center h-64 md:h-96"
        style={{ backgroundImage: "url('images/hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Rasakan Kelezatan Setiap Suapan
            </h2>
            <p className="text-lg md:text-xl mb-6">
              Pesan makanan favorit Anda dan nikmati di rumah
            </p>
            <a
              href="#menu"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Lihat Menu
            </a>
          </div>
        </div>
      </section>
      <div className="p-4 max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-4 text-center text-green-900">
          Menu Kami
        </h2>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setFilterMenu("food")}
            className={`px-5 py-1 rounded-2xl hover:bg-green-800 text-white duration-200 ${
              filterMenu === "food" ? "bg-green-800" : "bg-green-600"
            }`}
          >
            Makanan
          </button>
          <button
            type="button"
            onClick={() => setFilterMenu("beverage")}
            className={`px-5 py-1 rounded-2xl hover:bg-green-800 text-white duration-200 ${
              filterMenu === "beverage" ? "bg-green-800" : "bg-green-600"
            }`}
          >
            Minuman
          </button>
        </div>
        {isLoadingGetMenus && (
          <div className="mt-20">
            <Spinner size={12} />
          </div>
        )}
        {menus.length < 1 && !isLoadingGetMenus ? (
          <p className="text-center mt-4 text-xl text-green-900">
            Menu tidak ditemukan
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {menus.map((item) => (
              <FoodCard
                key={item._id}
                food={item}
                selectFood={setSelectedFood}
              />
            ))}
          </div>
        )}
      </div>
      {selectedFood && (
        <AddToCartModal
          onClose={() => setSelectedFood(null)}
          food={selectedFood}
          onAddToCart={handleAddMenuToCart}
          isLoading={isLoadingAddCart}
        />
      )}
    </>
  )
}
