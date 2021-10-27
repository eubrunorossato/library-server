const User = require('../models/users');

const checkValues = (user) => {
  if (user.name === '' || !user.name || user.nickname === '' || !user.nickname || user.email === '' || !user.email || user.celphone === '' || !user.celphone || user.isByGoogle === '' || (user.isByGoogle === false && (user.password === '' || !user.password))) {
    throw new Error('Missing required fields');
  }
};

module.exports = {
  create: async (body) => {
    try {
      checkValues(body)
      const { name, nickname, email, celphone, isByGoogle, password } = body;
      const user = await User.create({ name, nickname, email, celphone, isByGoogle, password });
      return {
        code: 200,
        message: `User ${user.name} was registered sucessfully`
      }
    } catch (error) {
      return {
        code: 500,
        message: error.message
      }
    }
  },
  getAll: async () => {
    try {
      const users = await User.findAll();
      return {
        code: 200,
        users,
      }
    } catch (error) {
      return {
        code: 500,
        message: error.message
      }
    }
  },
  getUserByEmail: async (email) => {
    try {
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      return {
        code: 200,
        user,
      }
    } catch (error) {
      return {
        code: 500,
        message: error.message
      }
    }
  }
}