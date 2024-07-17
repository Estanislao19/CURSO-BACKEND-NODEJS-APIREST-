const express = require('express')
const cors = require('cors');
const routerApi = require('./routes')

const {logErrors, errorHandler,boomErrorHandler} = require('./middlewares/error.handler')

const app = express()
const port = 3000;

app.use(express.json())

// const whitelist = ['http:localhost:8080','https://myapp.com'];//estos dominios van a tener permiso de  hacer request
// const options = {
//   origin: (origin,callback) => {
//     if(whitelist.includes(origin)){//le pregutnto si ese origen est incluido para hacer permitir el acecesso
//       callback(null,true);
//     }else{
//       callback(new Error('no permitido'));
//     }
//   }

// }
app.use(cors());

app.get('/api',(req,res)=>{
  res.send('Hello word')
})

app.get('/api/nueva-ruta',(req,res)=>{
  res.send('Hola soy una nueva ruta')
})




routerApi(app);



app.get('/categories/:categoryId/products/:productId',(req,res)=>{
  const {categoryId,productId} =  req.params;
  res.json( {
    categoryId,
    productId,
    name:'Producto 2',
    price:2000
  })
})

app.get('/users', (req,res)=>{
  const {limit,offset}  = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.send('No hay parametros')
  }
});


app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

app.listen(port,()=>{
  console.log('Mi port' + port);
});

