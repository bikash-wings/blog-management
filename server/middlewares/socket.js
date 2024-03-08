const jwt = require("jsonwebtoken");

const db = require("../models");

const authenticateSocketUser = async (socket) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      throw new Error("token required!");
    }

    const { userId } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!userId) {
      throw new Error("Unauthorized access");
    }

    const user = await db.User.findOne({
      where: { id: userId },
      include: {
        model: db.invalidated_tokens,
        where: { token: token },
        required: false,
      },
    });

    if (!user || user.invalidated_tokens.length) {
      throw new Error("jwt expired");
    }
  } catch (error) {
    socket.disconnect(true);
  }
};

module.exports = { authenticateSocketUser };
