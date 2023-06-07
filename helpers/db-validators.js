const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  if (!role) {
    return;
  }

  const roleExists = await Role.findOne({ role });

  if (!roleExists) {
    throw new Error(`Role ${role} is not registered in the database`);
  }
};

// check if email exists
const existsEmail = async (email = '') => {
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new Error(`Email ${email} already exists`);
  }
};

const existsUserById = async (id = '') => {
  const existsUser = await User.findById(id);
  
  if (!existsUser) {
    throw new Error(`the user id ${id} doesnt exists in database`);
  }
};

module.exports = {
  isValidRole,
  existsEmail,
  existsUserById,
};
