const fieldsValidate = require('../middlewares/fields-validate');
const jwtValidate = require('../middlewares/jwt-validate');
const roleValidate = require('../middlewares/roles-validate');

module.exports = {
  ...fieldsValidate,
  ...jwtValidate,
  ...roleValidate
};