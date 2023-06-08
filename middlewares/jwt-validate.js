const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No token in request',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const user = await User.findById(payload.uid);

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};