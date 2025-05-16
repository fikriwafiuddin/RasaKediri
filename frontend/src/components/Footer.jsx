function Footer() {
  return (
    <div className="bg-green-900 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 items-start px-8 pt-4 pb-8 gap-5 border-b-2 border-green-800">
        <div className="place-self-center">
          <h3 className="text-center font-bold mb-2">KediriEats</h3>
          <p className="text-center sm:text-left">
            Menyajikan makanan Indonesia terbaik dengan cita rasa autentik yang
            membangkitkan kenangan.
          </p>
        </div>
        <div className="place-self-center">
          <h3 className="text-center font-bold mb-2">Jam Operasional</h3>
          <ul>
            <li>Senin - Jumat: 10:00 - 22:00</li>
            <li>Sabtu - Minggu: 09:00 - 23:00</li>
          </ul>
        </div>
        <div className="place-self-center">
          <h3 className="text-center font-bold mb-2">Kontak Kami</h3>
          <ul>
            <li>Jl. Nusantara No. 123</li>
            <li>081234567890</li>
            <li>Email: info@kedirieats.id</li>
          </ul>
        </div>
      </div>
      <p className="text-center py-4">
        © 2025 KediriEats Indonesia. Hak Cipta Dilindungi.
      </p>
    </div>
  )
}

export default Footer
