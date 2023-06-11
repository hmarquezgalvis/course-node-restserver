const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost, loginGooglePost } = require('../controllers/auth.controller');
const { fieldsValidate } = require('../middlewares/fields-validate');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldsValidate,
  ],
  loginPost,
);

router.post(
  '/google',
  [
    check('id_token', 'id_token is required').not().isEmpty(),
    fieldsValidate,
  ],
  loginGooglePost,
);

module.exports = router;