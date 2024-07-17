const productsRouter  = require('./products.router')
const express = require('express');


function routerApi (app) {
  const router = express.Router()
  app.use('/api/v1',router);//path global para todos los endpoints
  router.use('/products',productsRouter);
  
}

module.exports = routerApi
