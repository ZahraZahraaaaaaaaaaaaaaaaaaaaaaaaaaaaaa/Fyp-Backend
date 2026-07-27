const Attempt = require('../models/Attempt');
const Scenario = require('../models/Scenario');
const User = require('../models/User');
const { getStepByNumber } = require('../services/scenarioHelpers');
const { scoreToLevel, evaluateBadges, requiredLevelForDifficulty } = require('../services/gamification');
const { notifyAfterAttemptComplete } = require('../services/notificationService');

const POINTS_PER_CORRECT_DECISION = 5;

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildStepOrder(scenario) {
  const stepNumbers = (scenario.steps || []).map((s) => Number(s.stepNumber)).filter((n) => Number.isFinite(n));
  return shuffled(stepNumbers);
}

function ensureAttemptStepOrder(attempt, scenario) {
  if (Array.isArray(attempt.stepOrder) && attempt.stepOrder.length > 0) return;
  attempt.stepOrder = buildStepOrder(scenario);
  attempt.currentStepIndex = 0;
  attempt.currentStepNumber = attempt.stepOrder[0] ?? attempt.currentStepNumber ?? 1;
}

function buildSimulationPayload(option) {
  if (option.isCorrect || !option.simulationType || option.simulationType === 'none') {
    return { showSimulation: false };
  }
  return {
    showSimulation: true,
    simulationType: option.simulationType,
    simulationTitle: option.simulationTitle || 'Security alert',
    simulationLines: option.simulationLines?.length
      ? option.simulationLines
      : [option.consequenceText || 'Something went wrong.'],
    consequenceText: option.consequenceText,
  };
}

async function start(req, res) {
  const { scenarioId } = req.body;
  if (!scenarioId) return res.status(400).json({ message: 'scenarioId required' });

  const scenario = await Scenario.findById(scenarioId);
  if (!scenario || !scenario.isActive) {
    return res.status(404).json({ message: 'Scenario not available' });
  }

  if (req.user.role !== 'admin') {
    const requiredLevel = requiredLevelForDifficulty(scenario.difficulty);
    if ((req.user.level || 1) < requiredLevel) {
      return res.status(403).json({
        message: `This scenario unlocks at Level ${requiredLevel}. You are Level ${req.user.level || 1}.`,
        requiredLevel,
        currentLevel: req.user.level || 1,
      });
    }
  }

  const stepOrder = buildStepOrder(scenario);
  const startStepNumber = stepOrder[0] ?? 1;

  const attempt = await Attempt.create({
    userId: req.user._id,
    scenarioId: scenario._id,
    stepOrder,
    currentStepIndex: 0,
    currentStepNumber: startStepNumber,
    status: 'in_progress',
    startedAt: new Date(),
  });

  return res.status(201).json({
    attempt: {
      id: attempt._id,
      scenarioId: attempt.scenarioId,
      status: attempt.status,
      currentStepNumber: attempt.currentStepNumber,
      currentStepIndex: attempt.currentStepIndex,
      stepOrder: attempt.stepOrder,
      score: attempt.score,
      correctDecisions: attempt.correctDecisions,
      incorrectDecisions: attempt.incorrectDecisions,
      startedAt: attempt.startedAt,
    },
  });
}

async function submitDecision(req, res) {
  const { stepNumber, optionIndex } = req.body;
  if (stepNumber === undefined || optionIndex === undefined) {
    return res.status(400).json({ message: 'stepNumber and optionIndex required' });
  }

  const attempt = await Attempt.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });
  if (!attempt) return res.status(404).json({ message: 'Attempt not found' });
  if (attempt.status !== 'in_progress') {
    return res.status(400).json({ message: 'Attempt is not active' });
  }

  const scenario = await Scenario.findById(attempt.scenarioId);
  if (!scenario) return res.status(404).json({ message: 'Scenario missing' });

  ensureAttemptStepOrder(attempt, scenario);

  const step = getStepByNumber(scenario, Number(stepNumber));
  if (!step) return res.status(400).json({ message: 'Invalid step' });
  if (step.stepNumber !== attempt.currentStepNumber) {
    return res.status(400).json({ message: 'Not on this step' });
  }

  const opt = step.options[Number(optionIndex)];
  if (!opt) return res.status(400).json({ message: 'Invalid option' });

  const isCorrect = !!opt.isCorrect;
  const pointsEarned = isCorrect ? POINTS_PER_CORRECT_DECISION : 0;

  attempt.decisionHistory.push({
    stepNumber: step.stepNumber,
    optionIndex: Number(optionIndex),
    isCorrect,
    pointsEarned,
    at: new Date(),
  });
  attempt.score += pointsEarned;
  if (isCorrect) attempt.correctDecisions += 1;
  else attempt.incorrectDecisions += 1;

  const user = await User.findById(req.user._id);
  if (isCorrect) {
    user.correctStreak = (user.correctStreak || 0) + 1;
  } else {
    user.correctStreak = 0;
  }
  await user.save();

  const finished = attempt.currentStepIndex >= (attempt.stepOrder?.length || 0) - 1;
  if (!finished) {
    attempt.currentStepIndex += 1;
    attempt.currentStepNumber = attempt.stepOrder[attempt.currentStepIndex];
  }

  await attempt.save();

  const simulation = buildSimulationPayload(opt);

  const feedbackPayload = {
    isCorrect,
    feedbackText: opt.feedbackText,
    pointsEarned,
    redFlags: isCorrect ? [] : extractRedFlags(opt.feedbackText),
    nextStepNumber: finished ? null : attempt.currentStepNumber,
    isScenarioEnd: finished,
  };

  return res.json({
    attempt: {
      id: attempt._id,
      scenarioId: attempt.scenarioId,
      status: attempt.status,
      currentStepNumber: attempt.currentStepNumber,
      currentStepIndex: attempt.currentStepIndex,
      stepOrder: attempt.stepOrder,
      score: attempt.score,
      correctDecisions: attempt.correctDecisions,
      incorrectDecisions: attempt.incorrectDecisions,
    },
    simulation,
    feedback: feedbackPayload,
  });
}

function extractRedFlags(feedbackText) {
  const lines = (feedbackText || '').split('\n').map((l) => l.trim()).filter(Boolean);
  return lines.slice(0, 5);
}

async function getAttempt(req, res) {
  const attempt = await Attempt.findOne({
    _id: req.params.id,
    userId: req.user._id,
  })
    .populate('scenarioId', 'title type difficulty description estimatedTime')
    .lean();

  if (!attempt) return res.status(404).json({ message: 'Attempt not found' });
  return res.json(attempt);
}

async function complete(req, res) {
  const attempt = await Attempt.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });
  if (!attempt) return res.status(404).json({ message: 'Attempt not found' });

  const scenario = await Scenario.findById(attempt.scenarioId);
  if (!scenario) return res.status(404).json({ message: 'Scenario missing' });

  ensureAttemptStepOrder(attempt, scenario);

  const totalDecisions = attempt.decisionHistory.length;
  const onFinalStep = attempt.currentStepIndex >= (attempt.stepOrder?.length || 0) - 1;

  const forceComplete = req.body && req.body.force === true;

  const shouldComplete =
    attempt.status === 'in_progress' &&
    totalDecisions > 0 &&
    (forceComplete || onFinalStep);

  if (!shouldComplete && attempt.status === 'in_progress') {
    return res.status(400).json({
      message: 'Reach the final step and submit your last decision before completing.',
    });
  }

  if (attempt.status === 'completed') {
    const user = await User.findById(req.user._id).select('-passwordHash');
    return res.json({ attempt, user, alreadyCompleted: true, newNotifications: [] });
  }

  attempt.status = 'completed';
  attempt.completedAt = new Date();
  await attempt.save();

  const user = await User.findById(req.user._id);
  const previousLevel = user.level;
  const previousBadges = [...(user.earnedBadges || [])];
  const total = scenario.steps.length;
  const correct = attempt.correctDecisions;
  const accuracy = total > 0 ? correct / total : 0;
  const perfectRun = attempt.incorrectDecisions === 0 && attempt.correctDecisions > 0;
  const maxScore = total * POINTS_PER_CORRECT_DECISION;
  const normalizedScore = maxScore > 0 ? Math.round((attempt.score / maxScore) * 100) : 0;

  user.totalScore += attempt.score;
  user.level = scoreToLevel(user.totalScore);

  const wasCompleted = user.completedScenarios.some(
    (id) => String(id) === String(scenario._id)
  );
  if (!wasCompleted) {
    user.completedScenarios.push(scenario._id);
  }

  user.performanceSnapshot.push({
    scenarioType: scenario.type,
    accuracy,
    at: new Date(),
  });
  if (user.performanceSnapshot.length > 20) {
    user.performanceSnapshot = user.performanceSnapshot.slice(-20);
  }

  const firstCompletion = !wasCompleted && user.completedScenarios.length === 1;
  const newBadges = evaluateBadges(user, {
    scenarioType: scenario.type,
    perfectRun,
    streak: user.correctStreak,
    firstCompletion,
    scenarioJustCompleted: true,
    normalizedScore,
  });
  user.earnedBadges = newBadges;
  await user.save();

  const newNotifications = await notifyAfterAttemptComplete(user._id, {
    scenarioTitle: scenario.title,
    previousLevel,
    newLevel: user.level,
    previousBadges,
    newBadges: user.earnedBadges,
  });

  return res.json({
    attempt: {
      id: attempt._id,
      scenarioId: attempt.scenarioId,
      status: attempt.status,
      score: attempt.score,
      maxScore,
      normalizedScore,
      correctDecisions: attempt.correctDecisions,
      incorrectDecisions: attempt.incorrectDecisions,
      completedAt: attempt.completedAt,
    },
    summary: {
      accuracy,
      perfectRun,
      totalSteps: total,
      correctDecisions: correct,
    },
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      totalScore: user.totalScore,
      level: user.level,
      earnedBadges: user.earnedBadges,
      completedScenarios: user.completedScenarios,
      correctStreak: user.correctStreak,
    },
    newNotifications,
  });
}

module.exports = { start, submitDecision, getAttempt, complete };
