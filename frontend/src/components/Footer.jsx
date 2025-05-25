function Footer() {
  return (
    <div className="bg-green-900 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 px-8 pt-4 pb-8 gap-5 border-b-2 border-green-800">
        <div className="place-self-center">
          <h3 className="text-center font-bold mb-2">RasaKediri</h3>
          <p className="text-center sm:text-left">
            Serving the best Indonesian food with authentic flavors that bring
            back memories.
          </p>
        </div>
        <div className="place-self-center">
          <h3 className="text-center font-bold mb-2">Operating Hours</h3>
          <ul>
            <li>Monday - Friday: 10:00 - 22:00</li>
            <li>Saturday - Sunday: 09:00 - 23:00</li>
          </ul>
        </div>
        <div className="place-self-center">
          <h3 className="text-center font-bold mb-2">Contact Us</h3>
          <ul>
            <li>Jl. Nusantara No. 123</li>
            <li>081234567890</li>
            <li>Email: info@rasakediri.id</li>
          </ul>
        </div>
      </div>
      <p className="text-center py-4">
        © 2025 RasaKediri Indonesia. All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
