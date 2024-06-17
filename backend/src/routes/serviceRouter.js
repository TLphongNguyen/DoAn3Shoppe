const express = require('express');
const { CreateCategory, GetCategory } = require('../app/controller/category');
const { CreateProducts, getProduct, getProductActive, GetOs, getProductbyId, UpdateProducts, updateStatusProduct, searchProducts } = require('../app/controller/product');
const { CreateCart, getCartByCustomer } = require('../app/controller/cart');
const { createBill, getBillbyCustomer, getBillAdmin, getDetails, updateStatus } = require('../app/controller/bills');
const { createSupplier, getdataSupplier, updateSupplier, getdataSupplierActive } = require('../app/controller/supplier');
const { insertImportBills, getImportBills } = require('../app/controller/importbills')



const serviceRouters = express.Router();
//brand
serviceRouters.post('/createbrand', CreateCategory)
serviceRouters.get('/getcategory', GetCategory)

//products
serviceRouters.post('/createproducts', CreateProducts)
serviceRouters.get('/getproduct', getProduct)
serviceRouters.get('/getproductactive', getProductActive)
serviceRouters.get('/getos', GetOs)
serviceRouters.get('/products/:id', getProductbyId)
serviceRouters.post('/updateproduct/:id', UpdateProducts)
serviceRouters.get('/search/:name', searchProducts)
serviceRouters.post('/updatestatusphone', updateStatusProduct)
//cart
serviceRouters.post('/createcart', CreateCart)
serviceRouters.get("/getcart/:id", getCartByCustomer)
//bills
serviceRouters.post('/createbills', createBill)
serviceRouters.get('/getbill/:id', getBillbyCustomer)
serviceRouters.get('/getbilladmin', getBillAdmin)
serviceRouters.get('/getdetailbill/:id', getDetails)
serviceRouters.post('/updatestatus', updateStatus)
//supplier
serviceRouters.post('/createsupplier', createSupplier)
serviceRouters.get('/getsupplier', getdataSupplier)
serviceRouters.post('/updatesupplier', updateSupplier)
serviceRouters.get('/getsupplieracyive', getdataSupplierActive)
//importbills 
serviceRouters.post('/importbills', insertImportBills)
serviceRouters.get('/getimportbills', getImportBills)

module.exports = serviceRouters