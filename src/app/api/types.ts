export enum ImageMimeTypes {
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  PNG = "image/png",
}

export interface ImageFile extends File {
  type: ImageMimeTypes;
}
