const { zodError } = require("zod");
const success = (res, message = "Success", data = null) => {
  return res.status(200).json({
    success: true,
    message: message,
    data: data,
  });
};

const created = (res, message = "Created", data = null) => {
  return res.status(201).json({
    success: true,
    message: message,
    data: data,
  });
};
const badRequest = (res, message = "Bad Request") => {
  return res.status(400).json({
    success: false,
    message: message,
  });
};

const unauthorized = (res, message = "Unauthorized") => {
  return res.status(401).json({
    success: false,
    message: message,
  });
};

const forbidden = (res, message = "Forbidden") => {
  return res.status(403).json({
    success: false,
    message: message,
  });
};

const notFound = (res, message = "Not Found") => {
  return res.status(404).json({
    success: false,
    message: message,
  });
};

const conflict = (res, message = "Conflict") => {
  return res.status(409).json({
    success: false,
    message: message,
  });
};

const unprocessableEntity = (res, message = "Unprocessable Entity") => {
  return res.status(422).json({
    success: false,
    message: message,
  });
};

const serverError = (res, message = "Internal Server Error") => {
  return res.status(500).json({
    success: false,
    message: message,
  });
};

module.exports = {
  success,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  unprocessableEntity,
  serverError,
};
