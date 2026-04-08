const express = require('express');
const scenarioController = require('../controllers/scenarioController');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', authRequired, scenarioController.list);
router.get('/:id', authRequired, scenarioController.getById);
router.post('/', authRequired, adminOnly, scenarioController.create);
router.put('/:id', authRequired, adminOnly, scenarioController.update);
router.delete('/:id', authRequired, adminOnly, scenarioController.remove);

module.exports = router;
