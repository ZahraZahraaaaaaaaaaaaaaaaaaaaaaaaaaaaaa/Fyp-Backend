const BADGES = {
  FIRST_SCENARIO: 'first_scenario_completed',
  AWARENESS_STARTER: 'awareness_starter',
  PHISHING_DETECTOR: 'phishing_detector',
  VISHING_AWARE: 'vishing_aware',
  BAITING_BLOCKER: 'baiting_blocker',
  IMPERSONATION_DEFENDER: 'impersonation_defender',
  PERFECT_SCORE: 'perfect_score',
  SAFE_STREAK: 'safe_decision_streak',
  SCENARIO_MASTER: 'scenario_master',
  SECURITY_CHAMPION: 'security_champion',
};

function scoreToLevel(totalScore) {
  // Scoring is 5 points per correct decision; keep levels meaningful for demo pacing.
  if (totalScore < 50) return 1;
  if (totalScore < 125) return 2;
  if (totalScore < 225) return 3;
  if (totalScore < 350) return 4;
  if (totalScore < 500) return 5;
  return 6 + Math.floor((totalScore - 500) / 250);
}

function evaluateBadges(user, context) {
  const badges = new Set(user.earnedBadges || []);
  const {
    scenarioType,
    perfectRun,
    streak,
    firstCompletion,
    scenarioJustCompleted,
    normalizedScore,
  } = context;

  if (firstCompletion) {
    badges.add(BADGES.FIRST_SCENARIO);
  }
  if ((user.completedScenarios || []).length >= 1) {
    badges.add(BADGES.AWARENESS_STARTER);
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
    badges.add(BADGES.BAITING_BLOCKER);
  }
  if (scenarioJustCompleted && scenarioType === 'impersonation') {
    badges.add(BADGES.IMPERSONATION_DEFENDER);
  }
  if ((user.completedScenarios || []).length >= 5) {
    badges.add(BADGES.SCENARIO_MASTER);
  }
  if ((normalizedScore || 0) >= 90 && (user.totalScore || 0) >= 250) {
    badges.add(BADGES.SECURITY_CHAMPION);
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
