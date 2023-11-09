const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb+srv://aman17:Jaat9412@cluster0.tkmjt19.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(err);
    })


const dummy_product = [
    {
        name: 'iphone14',
        img: 'https://m.media-amazon.com/images/I/31VjlrbE3bL._SY445_SX342_QL70_FMwebp_.jpg',
        price: 499,
        desc: 'iphone 14 is latest with bionic chpset 16 and full hd display with c type charging'

    },
    {
        name: 'Macbook',
        img: 'https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg',
        price: 1099,
        desc: 'iphone 14 is latest with bionic chpset 16 and full hd display with c type charging'
    },
    {
        name: 'one Plus 11R',
        img: 'https://images.news18.com/ibnlive/uploads/2023/10/oneplus-11r-2023-10-2d5c32f7e417704a9df4441b4f062937-3x2.jpg?im=Resize,width=360,aspect=fit,type=normal?im=Resize,width=320,aspect=fit,type=normal',
        price: 399,
        desc: 'iphone 14 is latest with bionic chpset 16 and full hd display with c type charging'
    },
    {
        name: 'Nike Shoes',
        img: 'https://assets.ajio.com/medias/sys_master/root/20211224/1tuJ/61c4c229aeb26901101a2a6a/-473Wx593H-469034008-black-MODEL.jpg',
        price: 99,
        desc: 'iphone 14 is latest with bionic chpset 16 and full hd display with c type charging'
    },
    {
        name: 'JBL Music',
        img: 'https://m.media-amazon.com/images/I/41mVgoA65tL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 159,
        desc: 'iphone 14 is latest with bionic chpset 16 and full hd display with c type charging'
    },
    {
        name: 'Go PRO Camera',
        img: 'https://m.media-amazon.com/images/I/31dAVTXGFDL._SX300_SY300_QL70_FMwebp_.jpg',
        price: 129,
        desc: 'iphone 14 is latest with bionic chpset 16 and full hd display with c type charging'
    }
];


async function seedDB() {
    await Product.deleteMany({});
    await Product.insertMany(dummy_product);
    console.log('DB seeded')
}

seedDB();


