class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.status = statusCode;
    this.data = null;
    this.errorMessage = message;
    this.success = false;
  }
}

module.exports = CustomError;
