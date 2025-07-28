import productModel from '../models/product-model.js';
import asyncHandler from '../utils/AsyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import productSchema from '../validations/productValidation.js';
export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  const { error } = productSchema.validate(
    { name, price, discount, bgcolor, panelcolor, textcolor },
    { abortEarly: false }
  );
  if (error) {
    throw new ApiError(error.details.map(e => e.message).join(', '), 400);
  }
  await productModel.create({
    img: req.cloudinaryImage,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });
  req.flash('success', 'Product created successfully');
  res.redirect('/owners/admin');
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) throw new CustomError('Product not found', 404);
  if (product?.image?.public_id) {
    await uploader.destroy(product.image.public_id);
  }
  await productModel.findByIdAndDelete(id);
  req.flash('success', 'Product deleted successfully');
  res.redirect('/owners/admin');
});

export const deleteAllProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find({});
  await Promise.all(
    products.map(product =>
      product?.image?.public_id ? uploader.destroy(product.image.public_id) : Promise.resolve()
    )
  );
  await productModel.deleteMany({});
  req.flash('success', 'All products deleted successfully');
  res.redirect('/owners/admin');
});
