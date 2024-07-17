const express = require('express')

const ProductsServices = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductsSchema,updateProductsSchema,getProductsSchema} = require('../schemas/product.schema');



const router = express.Router();

const service = new ProductsServices()

//ruta especifica para productos
router.get('/',async(req,res)=>{
  const products =await service.find();
  res.json(products)
})

router.get('/filter',(req,res)=>{
  res.send('Yo soy un filter')
});

router.get('/:id',
  validatorHandler(getProductsSchema,'params'),//primero va a validar
  async(req,res,next)=>{
 try{
  const {id} =  req.params;
  const product =await service.findOne(id)
  res.json(product)
 }catch(error){
  next(error)
 }

})

router.post('/',
  validatorHandler(createProductsSchema,'BODY'),
  async(req,res)=>{
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct)
})

router.patch('/:id',
  validatorHandler(getProductsSchema,'params'),//primero que el get cumpla con el params
  validatorHandler(updateProductsSchema,'body'),
  async (req,res,next)=>{
  try{
    const {id} = req.params;
    const body = req.body;
    const product =await service.update(id,body)
    res.json(product)
  }catch(error){
   next(error)
  }

})

router.delete('/:id',async(req,res)=>{
  const {id} = req.params;
  const rta =await service.delete(id)
  res.json(rta)
})



module.exports = router;
