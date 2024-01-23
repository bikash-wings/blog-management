const multer = require("multer");
const db = require("../models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },

  filename: async (req, file, cb) => {
    const userId = req.params.userid;

    const user = await db.User.findOne({ where: { id: userId } });
    user.avatar = null;

    const extension = file.originalname.slice(
      ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );

    const uniqueFilename = `${userId}.${extension}`;

    req.avatar = uniqueFilename;

    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

module.exports = { upload };
