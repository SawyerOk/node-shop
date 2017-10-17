module.exports = {
  signUp: (req, res, next) => {
    const messages = req.flash("error");
    res.render("user/signup", {
      csrfToken: req.csrfToken(),
      messages,
      hasErrors: messages.length > 0
    });
  },

  signIn: (req, res, next) => {
    const messages = req.flash("error");
    res.render("user/signin", {
      csrfToken: req.csrfToken(),
      messages,
      hasErrors: messages.length > 0
    });
  },

  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },

  notLoggedIn: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
