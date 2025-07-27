import Joi from "joi";
const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    bgcolor: Joi.string().required(),
    panelcolor: Joi.string().required(),
    textcolor: Joi.string().required(),
});
export default productSchema;