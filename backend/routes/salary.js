const express = require('express');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Placeholder routes - will be implemented
router.get('/', auth, (req, res) => {
  res.json({ message: 'Salary routes - under development' });
});

module.exports = router;
