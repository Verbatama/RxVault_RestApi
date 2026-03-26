const { Dokter, User, Poli, Spesialis, Role } = require("../models");

const respon = require("../helpers/responseHelper");
// get
const getRole = async (req, res) => {
  try {
    const data = await Role.findAll();
    return respon.success(res, "Success get all role", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getSpesialis = async (req, res) => {
  try {
    const data = await Spesialis.findAll();
    return respon.success(res, "Success get all spesialis", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getPoli = async (req, res) => {
  try {
    const data = await Poli.findAll();
    return respon.success(res, "Success get all poli", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getDokter = async (req, res) => {
  try {
    const data = await Dokter.findAll();
    return respon.success(res, "Success get all dokter", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const data = await User.findAll();
    return respon.success(res, "Success get all user", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

// get by id
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Role.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Role not found");
    }
    return respon.success(res, "Success get role by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getSpesialisById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Spesialis.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Spesialis not found");
    }
    return respon.success(res, "Success get spesialis by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getPoliById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Poli.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Poli not found");
    }
    return respon.success(res, "Success get poli by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getDokterById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Dokter.findByPk(id);
    if (!data) {
      return respon.notFound(res, "Dokter not found");
    }
    return respon.success(res, "Success get dokter by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);
    if (!data) {
      return respon.notFound(res, "User not found");
    }
    return respon.success(res, "Success get user by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

// create
const createRole = async (req, res) => {
  try {
    const newRole = await Role.create(req.body);
    return respon.success(res, "Success create role", newRole);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createSpesialis = async (req, res) => {
  try {
    const newSpesialis = await Spesialis.create(req.body);
    return respon.success(res, "Success create spesialis", newSpesialis);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createPoli = async (req, res) => {
  try {
    const newPoli = await Poli.create(req.body);
    return respon.success(res, "Success create poli", newPoli);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createDokter = async (req, res) => {
  try {
    const newDokter = await Dokter.create(req.body);
    return respon.success(res, "Success create dokter", newDokter);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    return respon.success(res, "Success create user", newUser);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

// update
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return respon.notFound(res, "Role not found");
    }
    await role.update(req.body);
    return respon.success(res, "Success update role", role);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateSpesialis = async (req, res) => {
  try {
    const { id } = req.params;
    const spesialis = await Spesialis.findByPk(id);
    if (!spesialis) {
      return respon.notFound(res, "Spesialis not found");
    }
    await spesialis.update(req.body);
    return respon.success(res, "Success update spesialis", spesialis);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updatePoli = async (req, res) => {
  try {
    const { id } = req.params;
    const poli = await Poli.findByPk(id);
    if (!poli) {
      return respon.notFound(res, "Poli not found");
    }
    await poli.update(req.body);
    return respon.success(res, "Success update poli", poli);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateDokter = async (req, res) => {
  try {
    const { id } = req.params;
    const dokter = await Dokter.findByPk(id);
    if (!dokter) {
      return respon.notFound(res, "Dokter not found");
    }
    await dokter.update(req.body);
    return respon.success(res, "Success update dokter", dokter);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return respon.notFound(res, "User not found");
    }
    await user.update(req.body);
    return respon.success(res, "Success update user", user);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getRole,
  getSpesialis,
  getPoli,
  getDokter,
  getUser,
  //
  getRoleById,
  getSpesialisById,
  getPoliById,
  getDokterById,
  getUserById,
  //
  createRole,
  createSpesialis,
  createPoli,
  createDokter,
  createUser,
  //
  updateRole,
  updateSpesialis,
  updatePoli,
  updateDokter,
  updateUser,
};
