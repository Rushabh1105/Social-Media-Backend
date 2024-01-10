
import multer from 'multer'

// Storage Configurator to handle the post images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/postUploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname+ new Date().toISOString().replace(/:/g, '_'));
    }
});


// upload image middleware
const postImageUpload = multer({storage: storage});
export default postImageUpload;