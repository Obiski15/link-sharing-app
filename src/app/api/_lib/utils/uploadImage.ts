import { mkdir, stat, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
import mime from "mime";

import { ImageFile, ImageMimeTypes } from "../../types";
import { AppError } from "@/app/api/_lib/AppError";

export async function uploadImage(image: ImageFile) {
  if (!Object.values(ImageMimeTypes).includes(image.type))
    throw new AppError("Invalid file type. Kindly upload an image", 400);

  const buffer = Buffer.from(await image.arrayBuffer());

  const relativeDir = `/uploads/images/user/${new Date()
    .toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", "-")}`;

  const uploadDir = join(process.cwd(), relativeDir);

  try {
    await stat(uploadDir);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      throw new Error("Something went wrong");
    }
  }

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${image.name
    .replace(/\.[^/.]+$/, "")
    .replace(
      " ",
      "-"
    )}-${uniqueSuffix}-${crypto.randomUUID()}.${mime.getExtension(image.type)}`;

  const optimisedImage = await sharp(buffer)
    .jpeg({ quality: 80 })
    .resize(800)
    .toBuffer();

  await writeFile(`${uploadDir}/${filename}`, optimisedImage);

  return `${relativeDir}/${filename}`;
}
