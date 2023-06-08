const { Router } = require('express');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controller');
const { check } = require('express-validator');

const {
  fieldsValidate,
  validateJWT,
  hasRole,
} = require('../middlewares');

const { isValidRole, existsEmail, existsUserById } = require('../helpers/db-validators');


const router = Router();

router.get(
  '/',
  [
    check('offset', 'Offset must be a number').optional().isNumeric(),
    check('limit', 'Limit must be a number').optional().isNumeric(),
    fieldsValidate,
  ],
  userGet,
);

router.put(
  '/:id',
  [
    check('id', 'Not a valid Mongo ID').isMongoId(),
    check('id').custom(existsUserById),
    check('email').optional().isEmail(),
    check('password').optional().not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    fieldsValidate,
  ],
  userPut,
);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    check('email').custom(existsEmail),
    fieldsValidate,
  ],
  userPost,
);

router.delete(
  '/:id',
  [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Not a valid Mongo ID').isMongoId(),
    check('id').custom(existsUserById),
    fieldsValidate,
  ],
  userDelete,
);

router.patch('/', userPatch);

module.exports = router;