module.exports = {
  up: async (queryInterface) => {
    // Insert multiple users
    await queryInterface.bulkInsert(
      'users',
      [
        {
          fullName: 'Candidate User',
          email: 'candidate@user.com',
          password: '$2a$08$kO8SGO.nyNLC/Wg0ACkjw.wBrM963ns72mSljMCAtJLit/SmF.6Y.', // password
          phoneNumber: '9988776677',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullName: 'Recruiter User',
          email: 'recruiter@user.com',
          password: '$2a$08$kO8SGO.nyNLC/Wg0ACkjw.wBrM963ns72mSljMCAtJLit/SmF.6Y.', // password
          phoneNumber: '1122334455',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullName: 'Admin User',
          email: 'admin@user.com',
          password: '$2a$08$kO8SGO.nyNLC/Wg0ACkjw.wBrM963ns72mSljMCAtJLit/SmF.6Y.', // password
          phoneNumber: '1122334455',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {} // Removed `returning: true` since MySQL does not support it
    );

    // Fetch user IDs manually
    const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM users WHERE email IN (\'candidate@user.com\', \'recruiter@user.com\', \'admin@user.com\');',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Map emails to user IDs
    const candidateUser = users.find(user => user.email === 'candidate@user.com');
    const recruiterUser = users.find(user => user.email === 'recruiter@user.com');
    const adminUser = users.find(user => user.email === 'admin@user.com');

    if (!candidateUser || !recruiterUser || !adminUser) {
      throw new Error('User IDs not found!');
    }

    // Insert roles for users
    await queryInterface.bulkInsert('user_roles', [
      {
        userId: candidateUser.id,
        roleId: 1, // Example role for Candidate User
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: recruiterUser.id,
        roleId: 2, // Example role for Recruiter User
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: adminUser.id,
        roleId: 3, // Example role for Recruiter User
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
