const express = require('express');
const attemptController = require('../controllers/attemptController');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

router.post('/start', authRequired, attemptController.start);
router.post('/:id/decision', authRequired, attemptController.submitDecision);
router.get('/:id', authRequired, attemptController.getAttempt);
router.post('/:id/complete', authRequired, attemptController.complete);

module.exports = router;
