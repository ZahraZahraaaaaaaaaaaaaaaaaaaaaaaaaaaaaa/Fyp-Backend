const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authRequired } = require('../middleware/auth');
const { handleValidation } = require('../middleware/validate');

const router = express.Router();

router.post(
  '/register',
  [
    body('fullName').trim().notEmpty().withMessage('Full name required'),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password min 8 characters'),
  ],
  handleValidation,
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  handleValidation,
  authController.login
);

router.get('/me', authRequired, authController.me);

module.exports = router;
