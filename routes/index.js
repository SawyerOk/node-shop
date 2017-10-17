var express = require("express");
var router = express.Router();
const Cart = require("../models/cart");

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

router.get("/add-to-cart/:id", (req, res) => {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId)
    .then(product => {
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/");
    })
    .catch(e => {
      console.log(e);
      res.redirect("/");
    });
});

router.get("/shopping-cart", (req, res) => {
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});

router.get("/checkout", (req, res) => {
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", { products: null });
  }
  const cart = new Cart(req.session.cart);
  res.render("shop/checkout", { total: cart.totalPrice });
});

module.exports = router;
