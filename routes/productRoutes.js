const express= require('express');
const Product = require('../models/product');
const Review = require('../models/review');
const { validateProduct, isLoggedIn,isSeller,isProductAuthor } = require('../middleware/middleware');
const { showAllProducts, productForm, createProduct, showProducts,productEditForm, updateForm, deleteProduct } = require('../controllers/products');
const router=express.Router();



router.get('/products',showAllProducts);
router.get('/products/new',isLoggedIn,isSeller,productForm);
router.post('/products',validateProduct,isSeller,createProduct);
router.get('/products/:id',showProducts);
router.get('/products/:id/edit',isLoggedIn,isSeller,isProductAuthor,productEditForm);
router.patch('/products/:id',isLoggedIn,isSeller,isProductAuthor,updateForm);
router.delete('/products/:id',isLoggedIn,isSeller,isProductAuthor,deleteProduct);

module.exports=router;