const Scenario = require('../models/Scenario');
const { sanitizeScenarioForPlayer } = require('../services/scenarioHelpers');

async function list(req, res) {
  const { difficulty, type, active } = req.query;
  const filter = {};
  if (difficulty) filter.difficulty = difficulty;
  if (type) filter.type = type;
  if (active === 'true') filter.isActive = true;
  else if (active === 'false') filter.isActive = false;
  else if (req.user.role !== 'admin') filter.isActive = true;

  const scenarios = await Scenario.find(filter).sort({ createdAt: -1 }).lean();
  if (req.user.role === 'admin') {
    return res.json(scenarios);
  }
  const safe = scenarios.map((s) => sanitizeScenarioForPlayer(s));
  return res.json(safe);
}

async function getById(req, res) {
  const scenario = await Scenario.findById(req.params.id);
  if (!scenario) return res.status(404).json({ message: 'Scenario not found' });
  if (req.user.role !== 'admin' && !scenario.isActive) {
    return res.status(404).json({ message: 'Scenario not found' });
  }
  if (req.user.role === 'admin') {
    return res.json(scenario);
  }
  return res.json(sanitizeScenarioForPlayer(scenario));
}

async function create(req, res) {
  const scenario = await Scenario.create(req.body);
  return res.status(201).json(scenario);
}

async function update(req, res) {
  const scenario = await Scenario.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!scenario) return res.status(404).json({ message: 'Scenario not found' });
  return res.json(scenario);
}

async function remove(req, res) {
  const scenario = await Scenario.findByIdAndDelete(req.params.id);
  if (!scenario) return res.status(404).json({ message: 'Scenario not found' });
  return res.json({ message: 'Scenario deleted' });
}

module.exports = { list, getById, create, update, remove };
