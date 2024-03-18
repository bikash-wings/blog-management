const { StatusCodes } = require("http-status-codes");
const { default: axios } = require("axios");
const qs = require("qs");

const CustomError = require("../utills/CustomError");

const gOAuthLogin = async (req, res) => {
  const authcode = req.query.code;
  console.log("🚀 ~ gOAuthLogin ~ req:", authcode);

  if (!authcode) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Auth code not found");
  }

  const tokenResponse = await axios.post(
    "https://oauth2.googleapis.com/token",
    qs.stringify({
      code: authcode,
      client_id: process.env.GAUTH_CLIENT_ID,
      client_secret: process.env.GAUTH_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/auth/google/callback",
      grant_type: "authorization_code",
    })
  );
  console.log("🚀 ~ gOAuthLogin ~ tokenResponse:", tokenResponse);
  const { access_token, refresh_token } = tokenResponse.data;

  const userInfoResponse = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const { name, given_name, family_name, email, picture } =
    userInfoResponse.data;

  let checkUser = await db.User.findOne({ where: { email: email } });

  if (!checkUser) {
    checkUser = await db.User.create({
      fname: given_name,
      lname: family_name,
      fullName: name,
      email: email,
      avatar: picture,
      answer: "cricket",
      password: "1234",
    });
  }

  const token = jwt.sign({ userId: checkUser.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "300m",
  });

  checkUser.dataValues = {
    fullName: checkUser.dataValues.fullName,
    avatar: checkUser.dataValues.avatar,
    id: checkUser.dataValues.id,
  };

  const userPermissions = await db.Permission.findAll({
    where: { role_id: process.env.USER_ROLE },
  });
  checkUser.dataValues.permissions = userPermissions.map((per) => per.name);

  console.log("🚀 ~ gOAuthLogin ~ userPermissions:", userPermissions);

  res.redirect(
    `${
      process.env.CLIENT_URL
    }oauth/redirect?token=${token}&user=${JSON.stringify(checkUser)}`
  );

  //   passport.authenticate("google", {
  //     successRedirect: `${
  //       process.env.CLIENT_URL
  //     }oauth/redirect?token=${token}&user=${JSON.stringify(checkUser)}`,
  //     failureRedirect: "/auth/login/failed",
  //   });
};

module.exports = { gOAuthLogin };
