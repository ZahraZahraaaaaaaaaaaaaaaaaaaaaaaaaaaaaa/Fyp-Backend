const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authRequired, analyticsController.myAnalytics);

module.exports = router;
