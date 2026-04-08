const express = require('express');
const adminController = require('../controllers/adminController');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.use(authRequired, adminOnly);

router.get('/overview', adminController.overview);
router.get('/users', adminController.users);
router.get('/attempts', adminController.attempts);
router.get('/scenario-stats', adminController.scenarioStats);

module.exports = router;
