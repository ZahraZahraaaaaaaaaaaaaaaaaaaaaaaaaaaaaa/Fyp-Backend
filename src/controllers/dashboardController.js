const User = require('../models/User');
const Scenario = require('../models/Scenario');

async function myDashboard(req, res) {
  const user = await User.findById(req.user._id).lean();
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const totalScenariosCount = await Scenario.countDocuments({ isActive: true });
  const completedScenarios = (user.completedScenarios || []).map((id) => String(id));
  const completedScenariosCount = completedScenarios.length;

  return res.json({
    totalScore: user.totalScore ?? 0,
    level: user.level ?? 1,
    earnedBadgesCount: (user.earnedBadges || []).length,
    earnedBadges: user.earnedBadges || [],
    completedScenariosCount,
    totalScenariosCount,
    remainingScenariosCount: Math.max(0, totalScenariosCount - completedScenariosCount),
    completedScenarios,
  });
}

module.exports = { myDashboard };
