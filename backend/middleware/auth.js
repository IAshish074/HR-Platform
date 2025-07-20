const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    if (user.status !== 'active') {
      return res.status(401).json({ message: 'Account is not active' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Access denied' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
    }

    next();
  };
};

// Check if user can access employee data
const canAccessEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Admin and HR can access any employee
    if (['admin', 'hr'].includes(user.role)) {
      return next();
    }

    // Employee can only access their own data
    if (user.role === 'employee' && user._id.toString() === id) {
      return next();
    }

    // Manager can access their direct reports
    if (user.role === 'manager') {
      const employee = await User.findById(id);
      if (employee && employee.manager && employee.manager.toString() === user._id.toString()) {
        return next();
      }
    }

    return res.status(403).json({ message: 'Access denied: Cannot access this employee data' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { auth, authorize, canAccessEmployee };
