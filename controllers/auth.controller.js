const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const loginGooglePost = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);
    const { name, picture, email } = googleUser;

    let user = await User.findOne({ email });

    // if user does not exist
    if (!user) {
      user = new User({
        name,
        email,
        password: 'NO_PASSWORD',
        img: picture,
        google: true,
      });
      await user.save();
    }

    // if user state is false
    if (!user.state) {
      return res.status(401).json({
        msg: 'User blocked',
      });
    }

    // generate JWT
    const token = await generateJWT(user.id);

    res.json({
      data: user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: 'the token could not be verified',
    });
  }
};

module.exports = {
  loginPost,
  loginGooglePost,
};