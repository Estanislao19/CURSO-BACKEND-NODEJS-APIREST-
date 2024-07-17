function logErrors (err,req,res,next){//se encarga de capturar cualquier error
  console.log('logErrors');
  console.error(err);
  next(err);
}

//detectar un error
function errorHandler (err,req,res,next){//se encarga de capturar cualquier error
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack:err.stack
})
}

function boomErrorHandler (err,req,res,next){//se encarga de capturar cualquier error
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
    }else{
      next(err)
    }


}




module.exports = {logErrors, errorHandler,boomErrorHandler }

