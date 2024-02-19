import cloudinary from "../config/cloudinary.js";

// this is for Uploding images
export const uploadImageOnClodinary = async (img) => {
  let images = [];
  for (let i = 0; i < img.length; i++) {
    let result = await cloudinary.uploader.upload(img[i].path);
    images.push({ url:result.url, public_id: result.public_id });
  }
  return images;
};
