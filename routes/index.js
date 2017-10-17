var express = require("express");
var router = express.Router();

const Product = require("../models/product");


// Chunks an array into sub arrays for view grid system.
chunkArray = (arr, chunkSize) => {
  const productChunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    productChunks.push(arr.slice(i, i + chunkSize));
  }
  return productChunks;
};
/* GET home page. */
router.get("/", function(req, res, next) {
  Product.find()
    .then(products => {
      const productChunks = chunkArray(products, 3);
      res.render("shop/index", { products: productChunks });
    })
    .catch(e => {
      console.log(e);
    });
});


module.exports = router;
