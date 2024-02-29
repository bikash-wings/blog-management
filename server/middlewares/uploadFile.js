const multer = require("multer");
const db = require("../models");

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatar/");
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

const uploadAvatar = multer({ storage: avatarStorage });

const thumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/thumbnail/");
  },

  filename: async (req, file, cb) => {
    const userId = req.user.id;

    const extension = file.originalname.slice(
      ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );

    const uniqueFilename = `${userId}.${extension}`;

    req.thumbnail = uniqueFilename;

    cb(null, uniqueFilename);
  },
});

const uploadThumbnail = multer({ storage: thumbnailStorage });

module.exports = { uploadAvatar, uploadThumbnail };
