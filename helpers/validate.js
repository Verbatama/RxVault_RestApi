const response = require("../helpers/responseHelper");
const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    if (!schema || typeof schema.parse !== "function") {
      return response.serverError(res, "Validation schema is not configured");
    }
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    console.log("Zod error caught:", error);
    if (error instanceof ZodError) {
      const errorMessage = (error.issues || error.errors || [])
        .map((err) => err.message)
        .join(", ");
      console.log("Parsed errorMessage:", errorMessage);
      return response.badRequest(
        res,
        errorMessage || error.message || "Validation failed",
      );
    }
    next(error);
  }
};
module.exports = validate;
