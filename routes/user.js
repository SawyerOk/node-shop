var express = require("express");
var router = express.Router();

const csurf = require("csurf");
const passport = require("passport");

const csurfProtection = csurf();
router.use(csurfProtection);

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("user/profile");
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/");
});
//If user loggedIn - can't use routes below this middleware
router.use("/", notLoggedIn, (req, res, next) => {
  next();
});

router.get("/signup", (req, res) => {
  const messages = req.flash("error");
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages,
    hasErrors: messages.length > 0
  });
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true
  })
);

router.get("/signin", (req, res) => {
  const messages = req.flash("error");
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages,
    hasErrors: messages.length > 0
  });
});

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true
  })
);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
