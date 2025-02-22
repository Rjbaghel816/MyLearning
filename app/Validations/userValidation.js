import Joi from 'joi';

const userUpdateValidation = (req, res, next) => {
  // Define validation schema
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30),
    lastName: Joi.string().min(2).max(30),
    country: Joi.string().min(2).max(50),
    state: Joi.string().min(2).max(50),
    city: Joi.string().min(2).max(50),
    lookingFor: Joi.string().max(100),
    yearsOfExperience: Joi.number().integer().min(0).max(50),
    profileHeadline: Joi.string().max(100),
    shortDescription: Joi.string().max(500),
    phoneNumber: Joi.string().regex(/^\d{10}$/).messages({'string.pattern.base': 'Phone number must have 10 digits.'}),
    skills: Joi.array().items(Joi.string()).min(1)



    
  });

  // Validate data against schema
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: true, message: error.details[0].message });
  return next();
};

const changePasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    password: Joi.string().min(8).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: true, message: error.details[0].message });
  return next();
};

const forgetPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: true, message: error.details[0].message });
  return next();
};

const verifyOtpValidation = (req, res, next) => {
  const schema = Joi.object({
    otp: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: true, message: error.details[0].message });
  return next();
};

const validate = {
  userUpdateValidation,
  changePasswordValidation,
  forgetPasswordValidation,
  verifyOtpValidation
};

export default validate;
