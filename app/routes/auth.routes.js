import verifySignUp from '../middleware/verifySignUp.js';
import {signup, signin} from '../controllers/auth.controller.js';

const authRoutes = (app) => {
  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkRequiredFields,
      verifySignUp.checkDuplicateEmail
    ],
    signup
  );

  app.post('/api/auth/signin', [
    verifySignUp.checkRequiredFieldsForLogin
  ],
  signin);
};

export default authRoutes;