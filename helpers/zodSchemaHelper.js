const { z } = require("zod");

const requiredString = (fieldName, min = 1, max = 225) => {
  return z
    .string()
    .min(min, `${fieldName} wajib diisi`)
    .max(max, `${fieldName} tidak boleh lebih dari ${max} karakter`);
};

const requiredPositiveInteger = (fieldName) => {
  return z.number().int().positive(`${fieldName} harus lebih dari 0`);
};

const requiredEnum = (fieldName, values) => {
  return z.enum(values, {
    errorMap: () => ({
      message: `${fieldName} harus salah satu dari ${values.join(", ")}`,
    }),
  });
};

const requiredDate = (fieldName) => {
  return z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }, `${fieldName} harus berupa tanggal yang valid`);
};

const requiredEmail = (fieldName) => {
  z.string().email(`${fieldName} harus berupa email yang valid`);
};

const requiredPassword = (fieldName) => {
  return z.string().min(8, `${fieldName} harus memiliki minimal 8 karakter`);
};

module.exports = {
  requiredString,
  requiredPositiveInteger,
  requiredEnum,
  requiredDate,
  requiredEmail,
  requiredPassword,
};
