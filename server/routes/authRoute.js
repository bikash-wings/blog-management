const router = require("express").Router();
const { default: axios } = require("axios");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const db = require("../models");

const { gOAuthLoginController } = require("../controllers/authControllers");

/* Initiate google o-auth interface */
router.get("/google", passport.authenticate("google", ["profile", "email"]));

/* Initiate facebook o-auth interface */
router.get("/facebook", passport.authenticate("facebook"));

/* GET Google OAuth Route */
router.get(
  "/google/callback",
  // passport.authenticate("google", {
  //   successRedirect: `/auth/login/success?code=${req.query.code}`,
  //   failureRedirect: `http://localhost:5173/login`,
  // })

  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  function (req, res) {
    // Successful authentication, redirect login success.
    res.redirect(`/auth/login/success?code=${req.query.code}`);
  }
  
);

// router.get("/google/callback", async (req, res, next) => {
//   try {
//     const authcode = req.query.code;

//     const tokenResponse = await axios.post(
//       "https://oauth2.googleapis.com/token",
//       {
//         code: authcode,
//         client_id: process.env.CLIENT_ID,
//         client_secret: process.env.CLIENT_SECRET,
//         redirect_uri: "http://localhost:3000/auth/google/callback",
//         grant_type: "authorization_code",
//       }
//     );

//     const { access_token, refresh_token } = tokenResponse.data;

//     const userInfoResponse = await axios.get(
//       "https://www.googleapis.com/oauth2/v3/userinfo",
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     const { name, given_name, family_name, email, picture } =
//       userInfoResponse.data;

//     let checkUser = await db.User.findOne({ where: { email: email } });

//     if (!checkUser) {
//       checkUser = await db.User.create({
//         fname: given_name,
//         lname: family_name,
//         fullName: name,
//         email: email,
//         avatar: picture,
//         answer: "cricket",
//         password: "1234",
//       });
//     }

//     const token = jwt.sign(
//       { userId: checkUser.id },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "300m",
//       }
//     );

//     checkUser.dataValues = {
//       fullName: checkUser.dataValues.fullName,
//       avatar: checkUser.dataValues.avatar,
//       id: checkUser.dataValues.id,
//     };

//     const userPermissions = await db.Permission.findAll({
//       where: { role_id: process.env.USER_ROLE },
//     });
//     checkUser.dataValues.permissions = userPermissions.map((per) => per.name);

//     res.redirect(
//       `${
//         process.env.CLIENT_URL
//       }oauth/redirect?token=${token}&user=${JSON.stringify(checkUser)}`
//     );
//   } catch (error) {
//     console.error("Error during OAuth callback:", error);
//     res.redirect(`${process.env.CLIENT_URL}login`);
//   }
// });

/* GET Facebook OAuth route */
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

/* GET login success */
router.get("/login/success", gOAuthLoginController);

/* GET login failed */
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "login failure",
  });
});

/* OAuth logout */
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
