var express = require("express");
var router = express.Router();

const csurf = require("csurf");
const passport = require("passport");

const csurfProtection = csurf();
const UserController = require("../controllers/user");
router.use(csurfProtection);

router.get("/profile", UserController.isLoggedIn, (req, res) => {
  res.render("user/profile");
});

router.get("/logout", UserController.isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/");
});
//If user loggedIn - can't use routes below this middleware
router.use("/", UserController.notLoggedIn, (req, res, next) => {
  next();
});

router.get("/signup", UserController.signUp);

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true
  })
);

router.get("/signin", UserController.signIn);

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true
  })
);

module.exports = router;


