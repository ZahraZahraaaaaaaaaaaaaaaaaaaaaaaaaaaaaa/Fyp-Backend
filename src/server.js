require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');
const { startMemoryMongo } = require('./config/memoryMongo');

const PORT = process.env.PORT || 5000;

async function maybeAutoSeed() {
  if (process.env.AUTO_SEED !== 'true') return;
  const Scenario = require('./models/Scenario');
  const count = await Scenario.countDocuments();
  if (count > 0) {
    console.log('[auto-seed] Database already has scenarios, skipping.');
    return;
  }
  const { seedDatabase } = require('./seed/seedData');
  console.log('[auto-seed] Seeding database...');
  await seedDatabase();
}

async function main() {
  await startMemoryMongo();
  await connectDB();
  await maybeAutoSeed();
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
