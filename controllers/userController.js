const { User } = require("../models");
const respon = require("../helpers/responseHelper");

const getUser = async (req, res) => {
  try {
    const data = await User.findAll();
    respon.success(res, "Success get all user", data);
  } catch (error) {
    console.log(error);
    respon.error(res, "Error", 500);
  }
};

module.exports = {
  getUser,
};
