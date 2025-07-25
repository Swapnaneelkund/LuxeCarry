const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    discount: joi.number().required(),
    bgcolor: joi.string().required(),
    panelcolor: joi.string().required(),
    textcolor: joi.string().required(),
});
export default productSchema;