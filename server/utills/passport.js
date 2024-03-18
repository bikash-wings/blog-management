const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require("jsonwebtoken");

const db = require("../models");

/* Google strategy used below */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAUTH_CLIENT_ID,
      clientSecret: process.env.GAUTH_CLIENT_SECRET,
      callbackURL: process.env.GAUTH_REDIRECT_URI,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async function (req, accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      const fname = profile.name.givenName;
      const lname = profile.name.familyName;
      const name = profile.displayName;
      const picture = profile.photos[0].value;

      let checkUser = await db.User.findOne({ where: { email: email } });

      if (!checkUser) {
        checkUser = await db.User.create({
          fname: fname,
          lname: lname,
          fullName: name,
          email: email,
          avatar: picture,
          answer: "cricket",
          password: "1234",
        });
      }

      const token = jwt.sign(
        { userId: checkUser.id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "300m",
        }
      );

      checkUser.dataValues = {
        fullName: checkUser.dataValues.fullName,
        avatar: checkUser.dataValues.avatar,
        id: checkUser.dataValues.id,
      };

      const userPermissions = await db.Permission.findAll({
        where: { role_id: process.env.USER_ROLE },
      });
      checkUser.dataValues.permissions = userPermissions.map((per) => per.name);

      req.query.token = token;
      req.query.user = checkUser;

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
