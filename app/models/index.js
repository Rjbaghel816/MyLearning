import Sequelize from 'sequelize';
import DB_CONFIG from '../../config/db.config.js';
import createUserModel from './User.js';
import createRoleModel from './Role.js';

const sequelize = new Sequelize({ ...DB_CONFIG });

const db = {
  Sequelize,
  sequelize,
  user: createUserModel(sequelize, Sequelize),
  role: createRoleModel(sequelize, Sequelize),
  ROLES: ['candidate', 'recruiter', 'admin']
};

db.role.belongsToMany(db.user, { through: 'user_roles' });
db.user.belongsToMany(db.role, { through: 'user_roles' });

export default db;
