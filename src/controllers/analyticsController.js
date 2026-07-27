const Attempt = require('../models/Attempt');
const User = require('../models/User');
const { recommendDifficulty, computeAchievementPoints } = require('../services/gamification');

/**
 * Real cross-user percentile, replacing the frontend's old cosmetic formula
 * (12 + (1 - completion) * 28), which only used the caller's own badge count
 * and never looked at other users at all.
 */
async function computeGlobalRank(myAchievementPoints) {
  const allUsers = await User.find({}, 'earnedBadges').lean();
  const allPoints = allUsers.map((u) => computeAchievementPoints(u.earnedBadges));
  const totalUsers = allPoints.length;
  if (totalUsers === 0) {
    return { topPercentile: null, totalUsers: 0 };
  }
  const betterOrEqualCount = allPoints.filter((p) => p >= myAchievementPoints).length;
  const topPercentile = Math.max(1, Math.round((betterOrEqualCount / totalUsers) * 100));
  return { topPercentile, totalUsers };
}

async function myAnalytics(req, res) {
  const user = await User.findById(req.user._id).lean();
  const attempts = await Attempt.find({ userId: user._id, status: 'completed' })
    .populate('scenarioId', 'title type difficulty')
    .lean();

  const totalDecisions = attempts.reduce(
    (s, a) => s + (a.decisionHistory?.length || 0),
    0
  );
  const totalCorrect = attempts.reduce((s, a) => s + (a.correctDecisions || 0), 0);
  const accuracy = totalDecisions > 0 ? totalCorrect / totalDecisions : 0;

  const byType = {};
  for (const a of attempts) {
    const t = a.scenarioId?.type || 'unknown';
    if (!byType[t]) byType[t] = { correct: 0, total: 0 };
    byType[t].correct += a.correctDecisions || 0;
    byType[t].total += (a.decisionHistory || []).length;
  }

  const strengths = [];
  const weaknesses = [];
  for (const [t, v] of Object.entries(byType)) {
    const acc = v.total > 0 ? v.correct / v.total : 0;
    if (acc >= 0.75) strengths.push({ type: t, accuracy: acc });
    else if (acc < 0.6 && v.total > 0) weaknesses.push({ type: t, accuracy: acc });
  }

  const rec = recommendDifficulty(user.performanceSnapshot || []);
  const achievementPoints = computeAchievementPoints(user.earnedBadges);
  const globalRank = await computeGlobalRank(achievementPoints);

  return res.json({
    totalScore: user.totalScore,
    level: user.level,
    completedScenarios: (user.completedScenarios || []).length,
    accuracy: Math.round(accuracy * 1000) / 1000,
    totalCorrectDecisions: totalCorrect,
    totalDecisions,
    earnedBadges: user.earnedBadges || [],
    achievementPoints,
    globalRank,
    strengths,
    weaknesses,
    recommendation: rec,
    recentAttempts: attempts.slice(-10).map((a) => ({
      scenarioTitle: a.scenarioId?.title,
      type: a.scenarioId?.type,
      score: a.score,
      correctDecisions: a.correctDecisions,
      completedAt: a.completedAt,
    })),
  });
}

module.exports = { myAnalytics };
