const createNewUserSchema = {
  firstName: {
    in: ['body'],
    errorMessage: 'Invalid name value. It must be a string',
    isString: true,
  },
  lastName: {
    in: ['body'],
    errorMessage: 'Invalid name value. It must be a string',
    isString: true,
  },
  userName: {
    in: ['body'],
    errorMessage: 'Invalid name value. It must be a string',
    isString: true,
  },

  email: {
    in: ['body'],
    errorMessage: 'Invalid email value. It must be of email format',
    isEmail: true,
  },
  password: {
    in: ['body'],
    errorMessage: 'Invalid password value. It must be a string',
    isString: true,
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: { min: 7 },
    },
  },
};

export default createNewUserSchema;
