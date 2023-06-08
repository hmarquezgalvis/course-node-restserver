const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost } = require('../controllers/auth.controller');
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

module.exports = router;