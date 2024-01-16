const notFound = (res, message) => {
  return res.status(401).send({ success: false, message: message });
};

const alreadyExists = async (res, message) => {
  return res.status(403).send({ success: false, message: message });
};

module.exports = { notFound, alreadyExists };
