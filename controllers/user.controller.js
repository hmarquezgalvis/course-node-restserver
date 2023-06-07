const  { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const userGet = async (req, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const params = { state: true };

  const [users, total] = await Promise.all([
    User.find(params).skip(offset).limit(limit),
    User.count(params)
  ]);

  res.json({
    message: "get API - controller",
    total,
    data: users,
  });
};

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({
    name, 
    email,
    password,
    role,
  });

  // encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //save in DB
  await user.save();

  res.json({
    message: "post API - controller",
    data: user,
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...payload } = req.body;

  if (password) {
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    payload.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, payload);

  res.json({
    message: "put API - controller",
    data: user,
  });
};

const userPatch = (req, res = response) => {
  res.json({
    message: "patch API - controller",
  });
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    message: "delete API - controller",
    data: user,
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};