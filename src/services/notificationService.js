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

const ACHIEVEMENT_BADGE_IDS = new Set(['scenario_master', 'security_champion']);

const ONBOARDING_NOTIFICATIONS = [
  {
    staticKey: 'welcome',
    type: 'welcome',
    title: 'Welcome to SecureLearn',
    message: 'Start your cybersecurity awareness journey.',
  },
  {
    staticKey: 'training_reminder',
    type: 'reminder',
    title: 'Training Reminder',
    message: 'Complete your first scenario to begin earning badges.',
  },
];

/** Legacy static keys/types removed from onboarding */
const OBSOLETE_STATIC_KEYS = [
  'badges_progress',
  'daily_challenge',
  'security_tip',
];

const OBSOLETE_TYPES = [
  'daily_challenge',
  'training_reminder',
  'security_tip',
  'badges_progress',
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

async function removeObsoleteNotifications(userId) {
  await Notification.deleteMany({
    userId,
    $or: [{ staticKey: { $in: OBSOLETE_STATIC_KEYS } }, { type: { $in: OBSOLETE_TYPES } }],
  });
}

async function ensureStaticNotifications(userId) {
  await removeObsoleteNotifications(userId);

  const base = Date.now();
  let offset = ONBOARDING_NOTIFICATIONS.length;
  for (const item of ONBOARDING_NOTIFICATIONS) {
    const createdAt = new Date(base - offset * 60000);
    await Notification.findOneAndUpdate(
      { userId, staticKey: item.staticKey },
      {
        $set: {
          title: item.title,
          message: item.message,
          type: item.type,
        },
        $setOnInsert: {
          userId,
          staticKey: item.staticKey,
          isRead: false,
          createdAt,
        },
      },
      { upsert: true, new: true }
    );
    offset -= 1;
  }
}

async function notifyScenarioCompleted(userId, scenarioTitle) {
  await createNotification({
    userId,
    type: 'scenario_completed',
    title: 'Scenario Completed',
    message: `You successfully completed ${scenarioTitle}.`,
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

async function notifyBadgeEarned(userId, badgeId) {
  const name = badgeDisplayName(badgeId);
  await createNotification({
    userId,
    type: 'badge_earned',
    title: 'New Badge Unlocked',
    message: `You earned the ${name} badge.`,
  });
}

async function notifyAchievementUnlocked(userId) {
  await createNotification({
    userId,
    type: 'achievement_unlocked',
    title: 'Achievement Unlocked',
    message: 'You unlocked a new achievement.',
  });
}

async function notifyBadgesEarned(userId, newBadgeIds) {
  for (const badgeId of newBadgeIds) {
    if (ACHIEVEMENT_BADGE_IDS.has(badgeId)) {
      await notifyAchievementUnlocked(userId);
    } else {
      await notifyBadgeEarned(userId, badgeId);
    }
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
