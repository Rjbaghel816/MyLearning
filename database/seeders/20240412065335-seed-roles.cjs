module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('roles', [
      { id: 1, name: 'candidate', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'recruiter', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'admin', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};