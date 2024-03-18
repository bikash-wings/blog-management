const router = require("express").Router();
const passport = require("passport");

/* Initiate google o-auth interface */
router.get("/google", passport.authenticate("google", ["profile", "email"]));

/* GET Google OAuth redirect route */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/auth/login/success",
    failureRedirect: "http://localhost:5173/login",
  }),
  function (req, res) {
    // Successful authentication, redirect login success.
    res.redirect(`${process.env.CLIENT_URL}?token=${req.query.token}&user=${JSON.stringify(req.query.user)}`);
  }
);

/* Initiate facebook o-auth interface */
router.get("/facebook", passport.authenticate("facebook"));

/* GET Facebook OAuth redirect route */
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:5173/login",
  }),
  // Successful authentication, redirect login success.
  function (req, res) {
    res.redirect(`/auth/login/success?code=${req.query.code}`);
  }
);

/* OAuth logout */
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
