const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'],
  },
});

module.exports = model('Role', RoleSchema);
