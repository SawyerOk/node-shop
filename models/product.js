const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const productShema = new Shema({
  imgPath: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productShema);