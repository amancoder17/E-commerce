const express= require('express');
const Review = require('../models/review');
const Product = require('../models/product');
const { productSchema } = require('../validation/schemas');
const { isLoggedIn } = require('../middleware/middleware');
const router= express.Router();



router.post('/products/:ProductId/reviews',isLoggedIn,async(req,res)=>{
    try {
        const {ProductId}=req.params;
    const newReview = new Review(req.body);
    await newReview.save();    
    const product = await Product.findById(ProductId)

    // const newAvgRating = ((product.avgRating * product.reviews.length) + parseInt(req.body.rating)) / (product.reviews.lenght+1);
    // product.avgRating = parseFloat(newAvgRating.toFixed(1));

    product.reviews.push(newReview);
    await product.save();
    //flash msg
    req.flash('success','Added your review Successfully');
    // res.redirect('/products/:ProductId')
    res.redirect('back');
    } catch (e) {
        res.render('error',{err:e.message})
    }
})

// router.delete('/products/:ProductId/:id',async(req,res)=>{
//     const {id}=req.params;

// })





module.exports=router;