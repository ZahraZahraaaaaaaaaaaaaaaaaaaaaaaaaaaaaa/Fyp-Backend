const BADGES = {
  FIRST_SCENARIO: 'first_scenario_completed',
  PHISHING_DETECTOR: 'phishing_detector',
  PERFECT_SCORE: 'perfect_score',
  SAFE_STREAK: 'safe_decision_streak',
  VISHING_AWARE: 'vishing_aware',
  BAITING_SAFE: 'baiting_safe',
  IMPERSONATION_ALERT: 'impersonation_alert',
};

function scoreToLevel(totalScore) {
  if (totalScore < 50) return 1;
  if (totalScore < 150) return 2;
  if (totalScore < 300) return 3;
  if (totalScore < 500) return 4;
  if (totalScore < 800) return 5;
  return 6 + Math.floor((totalScore - 800) / 400);
}

function evaluateBadges(user, context) {
  const badges = new Set(user.earnedBadges || []);
  const { scenarioType, perfectRun, streak, firstCompletion, scenarioJustCompleted } = context;

  if (firstCompletion) {
    badges.add(BADGES.FIRST_SCENARIO);
  }
  if (perfectRun) {
    badges.add(BADGES.PERFECT_SCORE);
  }
  if (streak >= 5) {
    badges.add(BADGES.SAFE_STREAK);
  }
  if (scenarioJustCompleted && scenarioType === 'phishing') {
    badges.add(BADGES.PHISHING_DETECTOR);
  }
  if (scenarioJustCompleted && scenarioType === 'vishing') {
    badges.add(BADGES.VISHING_AWARE);
  }
  if (scenarioJustCompleted && scenarioType === 'baiting') {
    badges.add(BADGES.BAITING_SAFE);
  }
  if (scenarioJustCompleted && scenarioType === 'impersonation') {
    badges.add(BADGES.IMPERSONATION_ALERT);
  }

  return [...badges];
}

function recommendDifficulty(performanceSnapshot) {
  if (!performanceSnapshot || performanceSnapshot.length === 0) {
    return { suggested: 'beginner', reason: 'Start with beginner scenarios to build habits.' };
  }
  const recent = performanceSnapshot.slice(-5);
  const avg =
    recent.reduce((s, p) => s + (p.accuracy || 0), 0) / Math.max(recent.length, 1);
  if (avg >= 0.85) {
    return { suggested: 'advanced', reason: 'Strong recent accuracy — try advanced simulations.' };
  }
  if (avg >= 0.6) {
    return { suggested: 'intermediate', reason: 'Solid progress — intermediate scenarios fit well.' };
  }
  return { suggested: 'beginner', reason: 'Focus on fundamentals with beginner content.' };
}

module.exports = {
  BADGES,
  scoreToLevel,
  evaluateBadges,
  recommendDifficulty,
};
