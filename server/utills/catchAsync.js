const { setSuccessResponse } = require("./sendResponse");
const { StatusCodes } = require("http-status-codes");

const catchAsync = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((err) => {
    console.log(err);
    return setSuccessResponse(
      res,
      err.status || StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      err.errorMessage || "Something went wrong"
    );
  });
};

module.exports = { catchAsync };
