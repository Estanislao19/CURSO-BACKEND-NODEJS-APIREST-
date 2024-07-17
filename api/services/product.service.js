const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')



class ProductsServices {

  constructor() {
    this.products = [];
    this.generate()//para cada vez que inicie una instancia esten los 100 productos iniciales
  }

  generate() {
    const limit = 100
  for(let i =0; i<limit; i++){
    this.products.push({
      id: faker.string.uuid(),
      name:faker.commerce.productName(),
      price:parseInt(faker.commerce.price(),10),
      image: faker.image.imageUrl(),
      isBlock:faker.datatype.boolean(),
    })
  }
  }

 async create (data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct;
  }

  find() {
    return new Promise((resolve,reject) =>{
      setTimeout(()=>{
        resolve(this.products)
      },5000);
    })
  }

 async findOne(id) {
    const product =  this.products.find(item => item.id === id)
    if(!product){
      throw boom.notFound('product not found');
    }
    if(product.isBlock){
      throw boom.conflict('product is block');
    }
    return product;
  }

 async update(id,changes) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){//sino encuentra el elemento
      throw boom.notFound('product not found');
    }
    const product = this.products[index]
    this.products[index] ={
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){//sino encuentra el elemento
      throw boom.notFound('product not found');
    }
    this.products.splice(index,1);
    return {id}
  }
}

module.exports = ProductsServices;
