import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as multer from 'multer';
import * as dotenv from 'dotenv';
import { UnsupportedMediaTypeException } from '@nestjs/common';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formats = ['jpg', 'jpeg', 'png'];

export const multerConfig = (folder: string): multer.Options => {
  return {
    storage: new CloudinaryStorage({
      cloudinary,
      params: async (req, file) => {
        return {
          folder: 'barber',
          format: file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)[1],
          public_id: `${folder}/${Date.now()}-${file.originalname.split(/\.(?=[^\.]+$)/)[0]}`,
          transformation: [{ width: 500, height: 500, crop: 'limit' }],
        };
      },
    }),
    fileFilter: (
      req,
      file,
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(
          new UnsupportedMediaTypeException('Only image files are allowed!'),
          false,
        );
      }
      callback(null, true);
    },
    // limits: {
    //   fileSize: 1024 * 1024 * 5, // 5 MB
    // },
  };
};
