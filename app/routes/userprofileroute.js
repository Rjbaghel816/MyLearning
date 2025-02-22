import multer from 'multer';
import ProfileController from '../controllers/ProfileController.js'; 
import validate from '../Validations/userValidation.js'; 
import authJwt from '../middleware/authJwt.js'; 
import db from '../models/index.js'; 
// console.log(ProfileController);
// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export default function userRoute(app) {
  
  app.get('/api/user/profile', authJwt.verifyToken, ProfileController.getProfile(db));
  
  
  app.post('/api/user/profile', [authJwt.verifyToken, upload.single('profile_pic'), validate.userUpdateValidation], ProfileController.createProfile(db));
  
 
  app.put('/api/user/profile', [authJwt.verifyToken, upload.single('profile_pic'), validate.userUpdateValidation], ProfileController.updateProfile(db));
  
  
  app.delete('/api/user/profile', authJwt.verifyToken, ProfileController.deleteProfile(db));
}