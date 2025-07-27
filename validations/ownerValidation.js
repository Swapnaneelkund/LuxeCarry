import Joi from "joi";
const ownerRegisterSchema = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const ownerLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export {
  ownerRegisterSchema,
  ownerLoginSchema,
};
