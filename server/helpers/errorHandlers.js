const notFound = (res, message) => {
  return res.status(401).send({ success: false, message: message });
};

const alreadyExists = async (res, message) => {
  return res.status(403).send({ success: false, message: message });
};

const serverError = async (res, message) => {
  return res
    .status(500)
    .send({ success: false, message: "Internal Server Error!" });
};

module.exports = { notFound, alreadyExists, serverError };
