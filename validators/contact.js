const Joi = require('joi');

const contactValidator = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(3).max(30),
    message: Joi.string().min(3).max(200)
})

module.exports = { contactValidator };