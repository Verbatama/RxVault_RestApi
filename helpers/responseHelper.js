const success = (res, message, data = null, status = 200) => {
  return res.status(status).json({
    success: true,
    message: message,
    data: data,
  });
};

const error = (res, message, status = 500) => {
  return res.status(status).json({
    success: false,
    message: message,
  });
};

module.exports = {
  success,
  error,
};
