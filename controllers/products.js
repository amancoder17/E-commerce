const Product = require("../models/product");

module.exports.showAllProducts= async(req,res)=>{
    
    try {
        const products=await Product.find()
        //res.send(products)
        res.render('products/index',{products});
    } catch (e) {
        res.render('error',{err:e})
        
    }
    
}
module.exports.productForm= (req,res)=>{
    try {
        res.render('products/new');
    } catch (e) {
        res.render('error',{err:e})
        
    }
}
module.exports.createProduct=async(req,res)=>{
       try {
        await Product.create({...req.body,author:req.user._id});
    
        req.flash('success','product Added Successfully!');
       res.redirect('/products')
       } catch (e) {
           res.render('error',{err:e})  
       }
    }
module.exports.showProducts=async(req,res)=>{
    

    try {
        const {id}=req.params;
    const pro= await Product.findById(id).populate('reviews');
    
    res.render('products/show',{pro});
    } catch (e) {
        res.render('error',{err:e})
    }
}

module.exports.productEditForm=async (req,res)=>{
    try {
        const {id}=req.params;
    const produc= await Product.findById(id);
    res.render('products/edit',{produc});
    } 
    catch (e) {
        res.render('error',{err:e})
    }
}
module.exports.updateForm=async(req,res)=>{
    try {
        const {id}=req.params;
        req.flash('success','Product Edited Successfully!');
    await Product.findByIdAndUpdate(id,req.body);
    res.redirect(`/products/${id}`);
    } catch (e) {
        res.render('error',{err:e})
    }

}
module.exports.deleteProduct=async (req,res)=>{
    try {
        const {id}=req.params;
    const re= await Product.findById(id);
    for(let rev of re.reviews)
    {
        await Review.findByIdAndDelete(rev);
    }
    req.flash('success','Product Deleted Successfully!');
    await Product.findByIdAndDelete(id);

    res.redirect('/products');
    } catch (e) {
        res.render('error',{err:e.message})
    }
}