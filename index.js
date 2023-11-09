require('dotenv').config();
const secret=process.env.SECRET;
const MongoStore=require('connect-mongo');
const db_url= process.env.DB_URL || 'mongodb://127.0.0.1:27017/E-commerce';
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const ejsmate=require('ejs-mate');
app.engine('ejs',ejsmate);
const methodOverride=require('method-override');
const PORT=process.env.PORT || 5001;
const flash = require('connect-flash');
const session = require('express-session');
const passport= require('passport');
const LocalStrategy=require('passport-local');
const User = require('./models/user');



const { expression } = require('joi');
//-----------connect MongoDB
mongoose.connect(db_url)
.then(()=>{
    console.log('DB connected');
})
.catch((err)=>{
    console.log(err);
})

const path=require('path');
//----------set view engine 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//---------override methods like delete etc
app.use(methodOverride('_method'));

//----------use static files
app.use(express.static(path.join(__dirname,'public')));

//---------body parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//---------session 

const sessionConfig={
    //store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/E-commerce' }),
    store: MongoStore.create({
        mongoUrl: db_url,
      }),
    secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:7*24*60*60*1000
    }
  }

app.use(session(sessionConfig)); 

//using flash
app.use(flash());



//setuping passport and initializing
app.use(passport.initialize());
app.use(passport.session());
//telling passport to check for username and password using authenticate method provided by the passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));

//this tells passport to use passport-local-mongoose methods to add or remove user from session.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//-----
app.use((req,res,next)=>{
    // console.log(req.session);
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.reject=req.flash('reject');
    next();
})



//-------Routes------//
const productRoutes=require('./routes/productRoutes');
app.use(productRoutes);
const reviewRoutes=require('./routes/reviewRoutes');
app.use(reviewRoutes);
const authRoutes=require('./routes/auth');
app.use(authRoutes);
const cartRoutes=require('./routes/cart')
app.use(cartRoutes);
//--------API-------

const productAPI= require('./routes/api/productapi')
app.use(productAPI);
const paymentAPI= require('./routes/api/paymentapi')
app.use(paymentAPI);


app.get('/',(req,res)=>{
    res.render('home');
})


app.listen(PORT,()=>{
    console.log('server is up at PORT:',PORT);
})