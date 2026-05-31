const express = require('express');
const { authRequired } = require('../middleware/auth');
const { myDashboard } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/me', authRequired, myDashboard);

module.exports = router;
