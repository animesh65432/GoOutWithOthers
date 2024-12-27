import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRECT,
});

console.log(process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRECT)


const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "events", // Specify the Cloudinary folder
        format: "jpg", // Optional: Set image format
        public_id: `event_${Date.now()}`, // Generate a unique ID
    }),
});

console.log(storage, "it's the storage")

const upload = multer({ storage });
console.log(upload, "it's the upload")

export default upload;
