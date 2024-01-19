const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },

  filename: (req, file, cb) => {
    const userId = req.params.userid;
    const extension = file.originalname.slice(
      ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );

    const uniqueFilename = `${userId}.${extension}`;
    console.log(uniqueFilename);

    req.avatar = uniqueFilename;

    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

module.exports = { upload };
