const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Scenario = require('../models/Scenario');
const Attempt = require('../models/Attempt');
const scenariosData = require('./scenariosData');

async function seedDatabase() {
  await Scenario.deleteMany({});
  await Attempt.deleteMany({});
  await User.deleteMany({});

  const inserted = await Scenario.insertMany(scenariosData);
  console.log(`Inserted ${inserted.length} scenarios`);

  const adminHash = await bcrypt.hash('Admin123!', 12);
  const admin = await User.create({
    fullName: 'Platform Admin',
    email: 'admin@training.local',
    passwordHash: adminHash,
    role: 'admin',
    totalScore: 0,
    level: 1,
    earnedBadges: [],
    completedScenarios: [],
  });
  console.log('Admin user:', admin.email, 'password: Admin123!');

  const demoHash = await bcrypt.hash('User123!', 12);
  const demo = await User.create({
    fullName: 'Demo Trainee',
    email: 'user@training.local',
    passwordHash: demoHash,
    role: 'user',
    totalScore: 0,
    level: 1,
    earnedBadges: [],
    completedScenarios: [],
  });
  console.log('Demo user:', demo.email, 'password: User123!');
}

module.exports = { seedDatabase };
