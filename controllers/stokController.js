 const {Stok}  = require('../models')
 const respon = require('../helpers/responseHelper')

const getStok = async (req, res) => {
   try {
     const data = await Stok.findAll()
     return respon.success(res, "Succes get all stok", data)
   } catch(error) {
     console.log(error)
     return respon.serverError(res, error.message)
   }

 }

 const getStokById = async (req, res) => {
   try{
     const {id} = req.params
     const data = Stok.findByPk(id)
     if(!data){
       return respon.notFound(res, "Stok not found")
     }
     return respon.success(res, "Succes get stok by id", data)
   } catch (error){
     console.log(error)
     return respon.serverError(res, error.message)
   }
 }

 const createStok = async (req, res) => {
  try {
    const data = await Stok.create(req.body);
    respon.success(res, "Succes created stok",data);
  } catch (error) {
     console.log(error)
    respon.serverError(res, error.message);
  }
};

const updateStok = async (req, res) => {
  try {
    const { id } = req.params;
    const stok = await Stok.findByPk(id)
    if (!stok){
       return respon.notFound(res, "Stok not found")
     }
    await stok.update(req.body)
    return respon.success(res, "Succes update stok", stok)
  } catch (error) {
    console.log(error)
    respon.serverError(res, error.message)
  }
}; 

 module.exports ={
   getStok,
   getStokById,
   createStok,
   updateStok

 }
