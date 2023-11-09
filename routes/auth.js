const mongoose=require('mongoose');
const express=require('express');
const User = require('../models/user');
const passport = require('passport');
const router=express.Router();

// router.get('/fake',async (req,res)=>{
//     const user = {
//         email:'aman@gmail.com',
//         username:'aman'
//     }
//     const newUser= await User.register(user,'1234');
//     res.send(newUser)
// })

router.get('/login',(req,res)=>{
    res.render('auth/login')
})
router.get('/signup',(req,res)=>{
    res.render('auth/signup');
})

router.post('/signup',async(req,res)=>{
   try {
    const {username,email,password,role}=req.body;
    const user= new User({username,email,role});
    const newUser= await User.register(user,password);
    

    req.login(newUser,function(err){
        if(err){
            return next(err);
        }
        req.flash('success','Welcome you are registered successfully!')
        res.redirect('/products');
    })
   } catch (e) {
    req.flash('reject',e.message);
    res.redirect('/signup')
   }
})


router.post('/login',
     passport.authenticate('local',
     {
        failureRedirect:'/login',
        failureFlash:true
        
     }
   ),
   (req,res)=>{
              req.flash('success',`Welcome ${req.user.username}`);
              res.redirect('/products')
})


router.get('/logout', (req,res,next)=>{
     req.logout(function (err) {
        if(err){
            return next(err);
        }
        req.flash('success','Good-Bye')
        console.log('Logout successful')
        res.redirect('/');
     });

    // req.flash('success','Good-Bye')
    // console.log('Logout successful')
    // res.redirect('/products');
    
})












module.exports=router;