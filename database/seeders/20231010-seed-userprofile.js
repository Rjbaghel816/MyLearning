export default {
  up: async (queryInterface) => {
    // Fetch user IDs for candidate, recruiter, and admin
    const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM users WHERE email IN (\'candidate@user.com\', \'recruiter@user.com\', \'admin@user.com\');',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
  
    const candidateUser = users.find((user) => user.email === 'candidate@user.com');
    
  
    if (!candidateUser) {
      throw new Error('User IDs not found!');
    }
  
    // Insert user profiles
    await queryInterface.bulkInsert(
      'userprofiles',
      [
        {
          firstName: 'Candidate',
          lastName: 'User',
          country: 'USA',
          state: 'California',
          city: 'San Francisco',
          lookingFor: 'Software Engineer',
          yearsOfExperience: 3,
          profileHeadline: 'Full Stack Developer',
          shortDescription: 'Experienced in JavaScript, Node.js, and React.',
          phoneNumber: '9988776677',
          skills: JSON.stringify(['JavaScript', 'Node.js', 'React']),
          userId: candidateUser.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },
  
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('userprofiles', null, {});
  }
};