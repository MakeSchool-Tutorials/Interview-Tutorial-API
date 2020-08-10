const signInSchema = {
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

export default signInSchema;
