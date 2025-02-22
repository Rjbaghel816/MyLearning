import Sequelize from 'sequelize';
import DB_CONFIG from '../../config/db.config.js';
import createUserModel from './User.js';
import createRoleModel from './Role.js';
import createUserProfileModel from './UserProfile.js'; // Import the UserProfile model

const sequelize = new Sequelize({ ...DB_CONFIG });

const db = {
  Sequelize,
  sequelize,
  user: createUserModel(sequelize, Sequelize),
  role: createRoleModel(sequelize, Sequelize),
  userProfile: createUserProfileModel(sequelize, Sequelize), // Add UserProfile to the db object
  ROLES: ['candidate', 'recruiter', 'admin']
};

db.role.belongsToMany(db.user, { through: 'user_roles' });
db.user.belongsToMany(db.role, { through: 'user_roles' });

// Define associations
db.user.hasOne(db.userProfile, { foreignKey: 'userId', as: 'profile' });
db.userProfile.belongsTo(db.user, { foreignKey: 'userId', as: 'user' });
export default db;