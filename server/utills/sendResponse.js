const setSuccessResponse = (
  res,
  code = "",
  success = "",
  data = null,
  message = ""
) => {
  return res.status(code).json({ code, success, data, message });
};

module.exports = { setSuccessResponse };
