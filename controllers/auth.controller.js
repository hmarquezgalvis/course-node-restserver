const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const loginPost = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User / Password are not valid - email',
      });
    }

    // user active
    if (!user.state) {
      return res.status(400).json({
        msg: 'User / Password are not valid - state: false',
      });
    }

    // check password
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password are not valid - password',
      });
    }

    // generate JWT
    const token = await generateJWT(user.id);
    res.json({
      data: user,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'Something went wrong: ' + err,
    });
  }
};

module.exports = {
  loginPost,
};