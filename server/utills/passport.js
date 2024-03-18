const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

/* Google strategy used below */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAUTH_CLIENT_ID,
      clientSecret: process.env.GAUTH_CLIENT_SECRET,
      callbackURL: process.env.GAUTH_REDIRECT_URI,
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

/* Facebook strategy used below */
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FAUTH_CLIENT_ID,
      clientSecret: process.env.FAUTH_CLIENT_SECRET,
      callbackURL: process.env.FAUTH_REDIRECT_URI,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
