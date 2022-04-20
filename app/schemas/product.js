const Joi = require("joi");

const productSchema = {
  products: Joi.object({
    title: Joi.string().required(),
    desctiption: Joi.string(),
    img: Joi.string().required(),
    price: Joi.number().required(),
    brand: Joi.string().required(),
    year: Joi.string().required(),
    categories: Joi.array().required(),
  }),
};
module.exports = productSchema;
