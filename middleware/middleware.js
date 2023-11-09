const Product = require("../models/product");
const { productSchema } = require("../validation/schemas");

module.exports.validateProduct=(req,res,next)=>{
    const {name,img,price,desc}=req.body;
    const {error}=productSchema.validate({name,img,price,desc});
    console.log(error);
    next();
}

module.exports.isLoggedIn=(req,res,next)=>{


    if(req.xhr && !req.isAuthenticated()){
        res.status(401).json({
            success:false
        })
    }

    if(!req.isAuthenticated()){
        req.flash('reject','You need to login first');
        return res.redirect('/login')
    }
    next();
}

module.exports.isSeller=(req,res,next)=>{
    if(req.user.role ==='buyer')
    {
        req.flash('reject','You are not authorised to do that!!')
        return res.redirect('back');
    }
    next();
}

module.exports.isProductAuthor=async(req,res,next)=>{
    const {id}=req.params;
    const product= await Product.findById(id);

    if(!product.author || !product.author.equals(req.user._id))
    {
        req.flash('reject','Not authorised to do this action');
        return res.redirect('back');
    }

    next();

}
