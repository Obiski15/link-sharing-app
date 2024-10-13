import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import sharp from "sharp";

import { ImageFile, ImageMimeTypes } from "../../types";
import { AppError } from "@/app/api/_lib/AppError";

cloudinary.config({
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
});

export async function uploadImage(image: ImageFile) {
  if (!Object.values(ImageMimeTypes).includes(image.type))
    throw new AppError("Invalid file type. Kindly upload an image", 400);

  const buffer = Buffer.from(await image.arrayBuffer());

  const optimisedImage = await sharp(buffer)
    .jpeg({ quality: 80 })
    .resize(800)
    .toBuffer();

  const uploadResult: UploadApiResponse = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "/link-sharing-app/user",
            use_filename: true,
          },
          (error, uploadResult) => {
            if (error) return reject(new AppError("Image Upload Failed", 500));

            return resolve(uploadResult as UploadApiResponse);
          }
        )
        .end(optimisedImage);
    }
  );

  return uploadResult.secure_url;
}
