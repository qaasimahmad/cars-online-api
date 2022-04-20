const Joi = require("joi");

const orderSchema = {
    order: Joi.object({
        userId: Joi.string().required(),
        products: Joi.array().items({
          productId: Joi.string().required(),
        }),
        amount: Joi.number().required(),
        address: Joi.string().required(),
      })
}
module.exports = orderSchema;