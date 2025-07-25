import express from 'express';
import upload from '../middleares/multer.js';
import cloudinaryUpload from '../middleares/cloudinaryUpload.js';
import {
  createProduct,
  deleteProduct,
  deleteAllProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.post('/create', upload.single('image'),cloudinaryUpload,createProduct);
router.get('/delete/:id', deleteProduct);
router.post('/product', deleteAllProducts);

export default router;
