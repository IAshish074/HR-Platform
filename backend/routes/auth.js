const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  getMe,
  changePassword,
  updateProfile
} = require('../controllers/authController');
const { auth, authorize } = require('../middleware/auth');
const { uploadProfilePicture, handleMulterError } = require('../middleware/upload');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public for first admin, then Private (Admin/HR only)
router.post('/register', [
  [
    body('employeeId', 'Employee ID is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    body('firstName', 'First name is required').notEmpty(),
    body('lastName', 'Last name is required').notEmpty(),
    body('position', 'Position is required').notEmpty(),
    body('dateOfJoining', 'Date of joining is required').isISO8601()
  ]
], register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ]
], login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, getMe);

// @route   PUT /api/auth/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', [
  auth,
  [
    body('currentPassword', 'Current password is required').exists(),
    body('newPassword', 'New password must be 6 or more characters').isLength({ min: 6 })
  ]
], changePassword);

// @route   PUT /api/auth/profile
// @desc    Update profile
// @access  Private
router.put('/profile', 
  auth,
  uploadProfilePicture,
  handleMulterError,
  updateProfile
);

module.exports = router;
