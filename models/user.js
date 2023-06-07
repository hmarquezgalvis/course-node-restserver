const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    default: 'USER_ROLE',
    enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  }
});

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();

  user.uid = _id;
  
  return user;
};

module.exports = model('User', UserSchema);
