const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

function signToken(userId) {
  return jwt.sign({}, process.env.JWT_SECRET, {
    subject: String(userId),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }
  const { fullName, email, password } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
    role: 'user',
  });
  const token = signToken(user._id);
  return res.status(201).json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      totalScore: user.totalScore,
      level: user.level,
      earnedBadges: user.earnedBadges,
    },
  });
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken(user._id);
  return res.json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      totalScore: user.totalScore,
      level: user.level,
      earnedBadges: user.earnedBadges,
    },
  });
}

async function me(req, res) {
  const user = await User.findById(req.user._id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    totalScore: user.totalScore,
    level: user.level,
    earnedBadges: user.earnedBadges,
    completedScenarios: user.completedScenarios,
    createdAt: user.createdAt,
  });
}

module.exports = { register, login, me };
