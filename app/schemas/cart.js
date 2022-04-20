const Joi = require("joi");

const cartSchema = {
    carts: Joi.object({
        userId: Joi.string().required(),
        products: Joi.array().items({
          productId: Joi.string().required(),
        }),
      })
}
module.exports = cartSchema;
