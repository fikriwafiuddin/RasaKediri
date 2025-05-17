import "dotenv/config"
import mongoose from "mongoose"
import Menu from "../models/menuModel.js"

const menu = [
  {
    name: "Nasi Goreng",
    price: 25000,
    description: "Nasi goreng khas Indonesia dengan telur, ayam, dan kerupuk.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446322/nasi_goreng_gluskk.webp",
      cloudinary_id: "nasi_goreng_gluskk",
    },
  },
  {
    name: "Sate Ayam",
    price: 30000,
    description: "Sate ayam dengan bumbu kacang khas dan lontong.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446322/sate_ayam_v4c8m9.webp",
      cloudinary_id: "sate_ayam_v4c8m9",
    },
  },
  {
    name: "Rendang",
    price: 35000,
    description:
      "Daging sapi dimasak dengan santan dan rempah-rempah khas Minang.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446322/rendang_wzywyq.webp",
      cloudinary_id: "rendang_wzywyq",
    },
  },
  {
    name: "Gado-Gado",
    price: 20000,
    description: "Salad sayur dengan bumbu kacang dan kerupuk.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446323/gado_gado_gmysx7.webp",
      cloudinary_id: "gado_gado_gmysx7",
    },
  },
  {
    name: "Soto Ayam",
    price: 25000,
    description: "Sup ayam kuning dengan bihun, telur, dan perkedel.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446322/soto_ayam_ay1zru.webp",
      cloudinary_id: "soto_ayam_ay1zru",
    },
  },
  {
    name: "Bakso",
    price: 22000,
    description: "Bola daging sapi disajikan dalam kuah kaldu gurih.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446323/bakso_hskv60.webp",
      cloudinary_id: "bakso_hskv60",
    },
  },
  {
    name: "Mie Ayam",
    price: 20000,
    description: "Mie dengan topping ayam manis gurih dan sawi.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446322/mie_ayam_wj1hzk.webp",
      cloudinary_id: "mie_ayam_wj1hzk",
    },
  },
  {
    name: "Ayam Goreng",
    price: 28000,
    description: "Ayam goreng khas dengan bumbu manis dan sambal.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446323/ayam_goreng_vqgmul.webp",
      cloudinary_id: "ayam_goreng_vqgmul",
    },
  },
  {
    name: "Pempek",
    price: 27000,
    description: "Ikan olahan goreng dengan kuah cuko khas Palembang.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446322/pempek_omczeo.webp",
      cloudinary_id: "pempek_omczeo",
    },
  },
  {
    name: "Tahu Tek",
    price: 18000,
    description:
      "Tahu goreng, lontong, dan kentang disiram bumbu kacang petis.",
    category: "food",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747446323/tahu_tek_mqnzbb.webp",
      cloudinary_id: "tahu_tek_mqnzbb",
    },
  },
  //   beverage
  {
    name: "Es Teh",
    price: 8000,
    description: "Teh dingin yang menyegarkan, cocok untuk menemani makanan.",
    category: "beverage",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747450031/es_teh_hbfb80.webp",
      cloudinary_id: "es_teh_hbfb80",
    },
  },
  {
    name: "Es Jeruk",
    price: 10000,
    description:
      "Minuman jeruk segar dengan es batu, rasa manis dan asam yang pas.",
    category: "beverage",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747450030/es_jeruk_dxhp9s.webp",
      cloudinary_id: "es_jeruk_dxhp9s",
    },
  },
  {
    name: "Es Cendol",
    price: 12000,
    description: "Minuman khas dengan cendol, santan, dan gula aren.",
    category: "beverage",
    image: {
      url: "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1747450031/es_dawet_k98bql.webp",
      cloudinary_id: "es_dawet_k98bql",
    },
  },
]

mongoose
  .connect("mongodb://localhost:27017/rasakediri")
  .then(async () => {
    await Menu.insertMany(menu)
    console.log("Menu inserted")
    process.exit()
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
