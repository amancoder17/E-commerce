const express= require('express');
const { isLoggedIn } = require('../../middleware/middleware');
const User = require('../../models/user');
const router= express.Router();


router.post('/products/:productId/like',isLoggedIn,async (req,res)=>{
    const {productId}=req.params;
    const user= req.user;
    const isLiked= req.user.wishlist.includes(productId);

    if(isLiked){
        await User.findByIdAndUpdate(user._id,{$pull:{wishlist:productId}},{new:true});
    }
    else{
        await User.findByIdAndUpdate(user._id,{$addToSet:{wishlist:productId}},{new:true});
    }

    res.json({
        success:true
    });
})



module.exports=router;