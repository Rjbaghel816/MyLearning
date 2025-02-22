const createProfile = (db) => async (req, res) => {
  const { id } = req.user; // Assuming you have user ID from authentication middleware
  const {
    firstName,
    lastName,
    country,
    state,
    city,
    lookingFor,
    yearsOfExperience,
    profileHeadline,
    shortDescription,
    phoneNumber,
    skills
  } = req.body;

  try {
    // Create new user profile
    const userProfile = await db.userProfile.create({
      firstName,
      lastName,
      country,
      state,
      city,
      lookingFor,
      yearsOfExperience,
      profileHeadline,
      shortDescription,
      phoneNumber,
      skills: JSON.stringify(skills),
      userId: id,
      profile_pic: req.file ? req.file.path : null
    });

    return res.status(201).json({ message: 'Profile created successfully', userProfile });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ message: 'An error occurred while creating the profile', error: error.message });
  }
};

const getProfile = (db) => async (req, res) => {
  const { id } = req.user;

  try {
    const userProfile = await db.userProfile.findOne({ where: { userId: id } });

    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({ userProfile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'An error occurred while fetching the profile', error: error.message });
  }
};

const updateProfile = (db) => async (req, res) => {
  const { id } = req.user;
  const {
    firstName,
    lastName,
    country,
    state,
    city,
    lookingFor,
    yearsOfExperience,
    profileHeadline,
    shortDescription,
    phoneNumber,
    skills
  } = req.body;

  try {
    const userProfile = await db.userProfile.findOne({ where: { userId: id } });

    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    userProfile.firstName = firstName || userProfile.firstName;
    userProfile.lastName = lastName || userProfile.lastName;
    userProfile.country = country || userProfile.country;
    userProfile.state = state || userProfile.state;
    userProfile.city = city || userProfile.city;
    userProfile.lookingFor = lookingFor || userProfile.lookingFor;
    userProfile.yearsOfExperience = yearsOfExperience || userProfile.yearsOfExperience;
    userProfile.profileHeadline = profileHeadline || userProfile.profileHeadline;
    userProfile.shortDescription = shortDescription || userProfile.shortDescription;
    userProfile.phoneNumber = phoneNumber || userProfile.phoneNumber;
    userProfile.skills = JSON.stringify(skills) || userProfile.skills;

    if (req.file) {
      userProfile.profile_pic = req.file.path;
    }

    await userProfile.save();

    return res.status(200).json({ message: 'Profile updated successfully', userProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message });
  }
};

const deleteProfile = (db) => async (req, res) => {
  const { id } = req.user;

  try {
    const userProfile = await db.userProfile.findOne({ where: { userId: id } });

    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await userProfile.destroy();

    return res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return res.status(500).json({ message: 'An error occurred while deleting the profile', error: error.message });
  }
};

export default {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
};