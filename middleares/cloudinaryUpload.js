import { uploader } from '../configuration/cloudinaryConfig.js';
import fs from 'fs/promises';
import {ApiError} from '../utils/ApiError.js';;

// Middleware to handle Cloudinary upload + cleanup
const cloudinaryUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new CustomError('Image file is required', 400);
    }

    const result = await uploader.upload(req.file.path);
    await fs.unlink(req.file.path); // delete local temp file

    req.cloudinaryImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    next();
  } catch (err) {
    next(err);
  }
};

export default cloudinaryUpload;
