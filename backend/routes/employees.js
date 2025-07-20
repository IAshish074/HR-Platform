const express = require('express');
const {
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats
} = require('../controllers/employeeController');
const { auth, authorize, canAccessEmployee } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/employees/stats
// @desc    Get employee statistics
// @access  Private (Admin/HR)
router.get('/stats', auth, authorize('admin', 'hr'), getEmployeeStats);

// @route   GET /api/employees
// @desc    Get all employees
// @access  Private (Admin/HR/Manager)
router.get('/', auth, authorize('admin', 'hr', 'manager'), getEmployees);

// @route   GET /api/employees/:id
// @desc    Get employee by ID
// @access  Private
router.get('/:id', auth, canAccessEmployee, getEmployeeById);

// @route   PUT /api/employees/:id
// @desc    Update employee
// @access  Private (Admin/HR)
router.put('/:id', auth, authorize('admin', 'hr'), updateEmployee);

// @route   DELETE /api/employees/:id
// @desc    Delete employee (mark as terminated)
// @access  Private (Admin only)
router.delete('/:id', auth, authorize('admin'), deleteEmployee);

module.exports = router;
