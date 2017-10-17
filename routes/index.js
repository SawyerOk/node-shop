var express = require("express");
var router = express.Router();
const Product = require("../models/product");
const csurf = require("csurf");
const passport = require("passport");

const csurfProtection = csurf();
router.use(csurfProtection);
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

router.get("/user/signup", (req, res) => {
  const messages = req.flash('error');
  res.render("user/signup", { csrfToken: req.csrfToken(), messages, hasErrors : messages.length > 0 });
});

router.post(
  "/user/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true
  })
);

router.get("/user/profile", (req, res) => {
  res.render("user/profile");
});

router.get("/user/signin", (req, res) => {
  const messages = req.flash('error');
  res.render("user/signin", { csrfToken: req.csrfToken(), messages, hasErrors : messages.length > 0 });
});

router.post(
  "/user/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true
  })
);
module.exports = router;
