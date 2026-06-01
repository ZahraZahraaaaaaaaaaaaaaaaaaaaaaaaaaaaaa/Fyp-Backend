const Notification = require('../models/Notification');

const BADGE_DISPLAY_NAMES = {
  first_scenario_completed: 'First Scenario Completed',
  awareness_starter: 'Awareness Starter',
  phishing_detector: 'Phishing Detector',
  vishing_aware: 'Vishing Aware',
  baiting_blocker: 'Baiting Blocker',
  impersonation_defender: 'Impersonation Defender',
  perfect_score: 'Perfect Score',
  safe_decision_streak: 'Safe Decision Streak',
  scenario_master: 'Scenario Master',
  security_champion: 'Security Champion',
};

const STATIC_NOTIFICATIONS = [
  {
    staticKey: 'welcome',
    type: 'welcome',
    title: 'Welcome to SecureLearn',
    message: 'Welcome to SecureLearn. Start your cybersecurity awareness journey.',
  },
  {
    staticKey: 'badges_progress',
    type: 'badges_progress',
    title: 'Unlock More Badges',
    message: 'Complete more modules to unlock new badges.',
  },
  {
    staticKey: 'training_reminder',
    type: 'training_reminder',
    title: 'Training Reminder',
    message: 'You have pending training modules waiting.',
  },
  {
    staticKey: 'daily_challenge',
    type: 'daily_challenge',
    title: 'Daily Challenge Available',
    message: 'Complete 2 scenarios today to earn bonus XP.',
  },
  {
    staticKey: 'security_tip',
    type: 'security_tip',
    title: 'Security Tip of the Day',
    message: 'Always verify sender domains before clicking email links.',
  },
];

function badgeDisplayName(badgeId) {
  return BADGE_DISPLAY_NAMES[badgeId] || badgeId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function createNotification({ userId, title, message, type, staticKey = null }) {
  if (staticKey) {
    const existing = await Notification.findOne({ userId, staticKey });
    if (existing) return existing;
  }
  return Notification.create({
    userId,
    title,
    message,
    type,
    staticKey,
    isRead: false,
  });
}

async function ensureStaticNotifications(userId) {
  const base = Date.now();
  let offset = STATIC_NOTIFICATIONS.length;
  for (const item of STATIC_NOTIFICATIONS) {
    const exists = await Notification.findOne({ userId, staticKey: item.staticKey });
    if (!exists) {
      await Notification.create({
        userId,
        title: item.title,
        message: item.message,
        type: item.type,
        staticKey: item.staticKey,
        isRead: false,
        createdAt: new Date(base - offset * 3600000),
      });
    }
    offset -= 1;
  }
}

async function notifyScenarioCompleted(userId, scenarioTitle) {
  await createNotification({
    userId,
    type: 'scenario_completed',
    title: 'Scenario Completed',
    message: `You completed ${scenarioTitle}.`,
  });
}

async function notifyLevelUp(userId, level) {
  await createNotification({
    userId,
    type: 'level_up',
    title: 'Level Up',
    message: `You reached Level ${level}.`,
  });
}

async function notifyBadgesEarned(userId, newBadgeIds) {
  for (const badgeId of newBadgeIds) {
    const name = badgeDisplayName(badgeId);
    await createNotification({
      userId,
      type: 'badge_earned',
      title: 'New Badge Unlocked',
      message: `You earned the ${name} badge.`,
    });
  }
}

async function notifyAfterAttemptComplete(userId, { scenarioTitle, previousLevel, newLevel, previousBadges, newBadges }) {
  await notifyScenarioCompleted(userId, scenarioTitle);
  if (newLevel > previousLevel) {
    await notifyLevelUp(userId, newLevel);
  }
  const prev = new Set(previousBadges || []);
  const earned = (newBadges || []).filter((id) => !prev.has(id));
  if (earned.length > 0) {
    await notifyBadgesEarned(userId, earned);
  }
}

module.exports = {
  ensureStaticNotifications,
  notifyAfterAttemptComplete,
  createNotification,
  badgeDisplayName,
};
