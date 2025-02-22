import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import userRoute from './userprofileroute.js';

const applyRoutes = (app) => {
  // simple route
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to layoffhelp api Application. Click the link to know more about the endpoints.',
      websiteUrl: 'https://layoffhelp.org/',
      documentationUrl: 'https://documenter.getpostman.com/view/21993237/2sAYX8J1KE'
    });
  });
  

  // routes

  userRoute(app);
  authRoutes(app);
  userRoutes(app);
};

export default applyRoutes;