import multer from 'multer'

// Configuration of disk storage for avatar upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profileUploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname+ new Date().toISOString().replace(/:/g, '_'));
    }
});

// Disk Storage configurator
const profileUpload = multer({storage: storage});
export default profileUpload;