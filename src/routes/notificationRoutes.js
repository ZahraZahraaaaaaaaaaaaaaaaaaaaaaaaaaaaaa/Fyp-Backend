const express = require('express');
const notificationController = require('../controllers/notificationController');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

router.get('/', authRequired, notificationController.list);
router.patch('/:id/read', authRequired, notificationController.markRead);
router.post('/read-all', authRequired, notificationController.markAllRead);

module.exports = router;
