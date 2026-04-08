const Attempt = require('../models/Attempt');
const User = require('../models/User');
const { recommendDifficulty } = require('../services/gamification');

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

  return res.json({
    totalScore: user.totalScore,
    level: user.level,
    completedScenarios: (user.completedScenarios || []).length,
    accuracy: Math.round(accuracy * 1000) / 1000,
    totalCorrectDecisions: totalCorrect,
    totalDecisions,
    earnedBadges: user.earnedBadges || [],
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
