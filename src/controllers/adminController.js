const User = require('../models/User');
const Attempt = require('../models/Attempt');
const Scenario = require('../models/Scenario');

async function overview(req, res) {
  const [userCount, scenarioCount, attemptCount, completedAttempts] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    Scenario.countDocuments(),
    Attempt.countDocuments(),
    Attempt.countDocuments({ status: 'completed' }),
  ]);

  const completionRate =
    attemptCount > 0 ? Math.round((completedAttempts / attemptCount) * 1000) / 1000 : 0;

  return res.json({
    totalUsers: userCount,
    totalScenarios: scenarioCount,
    totalAttempts: attemptCount,
    completedAttempts,
    completionRate,
  });
}

async function users(req, res) {
  const list = await User.find({ role: 'user' })
    .select('fullName email totalScore level earnedBadges completedScenarios createdAt')
    .sort({ createdAt: -1 })
    .lean();
  return res.json(list);
}

async function attempts(req, res) {
  const list = await Attempt.find()
    .populate('userId', 'fullName email')
    .populate('scenarioId', 'title type difficulty')
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();
  return res.json(list);
}

async function scenarioStats(req, res) {
  const scenarios = await Scenario.find().select('title type difficulty isActive').lean();
  const stats = [];

  for (const s of scenarios) {
    const attempts = await Attempt.find({ scenarioId: s._id });
    const completed = attempts.filter((a) => a.status === 'completed');
    const avgScore =
      completed.length > 0
        ? completed.reduce((sum, a) => sum + a.score, 0) / completed.length
        : 0;
    const avgCorrect =
      completed.length > 0
        ? completed.reduce((sum, a) => sum + a.correctDecisions, 0) / completed.length
        : 0;

    const mistakeMap = {};
    for (const a of attempts) {
      for (const d of a.decisionHistory || []) {
        if (!d.isCorrect) {
          const key = `step_${d.stepNumber}`;
          mistakeMap[key] = (mistakeMap[key] || 0) + 1;
        }
      }
    }

    stats.push({
      scenarioId: s._id,
      title: s.title,
      type: s.type,
      difficulty: s.difficulty,
      isActive: s.isActive,
      attemptCount: attempts.length,
      completedCount: completed.length,
      averageScore: Math.round(avgScore * 10) / 10,
      averageCorrectDecisions: Math.round(avgCorrect * 10) / 10,
      commonMistakes: mistakeMap,
    });
  }

  stats.sort((a, b) => a.averageCorrectDecisions - b.averageCorrectDecisions);

  return res.json({
    hardestScenarios: stats.slice(0, 5),
    all: stats,
  });
}

module.exports = { overview, users, attempts, scenarioStats };
