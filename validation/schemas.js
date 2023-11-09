const Joi= require('joi');

module.exports.productSchema=Joi.object({
    name:Joi.string().required(),
    img:Joi.string().required(),
    price:Joi.string().min(0).max(5).required(),
    desc:Joi.string().required()
})