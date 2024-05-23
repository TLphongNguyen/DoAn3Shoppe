const express = require('express');
const { CreateCategory, GetCategory } = require('../app/controller/category');
const { CreateProducts, getProduct, GetOs } = require('../app/controller/product');


const serviceRouters = express.Router();
//brand
serviceRouters.post('/createbrand', CreateCategory)
serviceRouters.get('/getcategory', GetCategory)

//products
serviceRouters.post('/createproducts', CreateProducts)
serviceRouters.get('/getproduct', getProduct)
serviceRouters.get('/getos', GetOs)
module.exports = serviceRouters