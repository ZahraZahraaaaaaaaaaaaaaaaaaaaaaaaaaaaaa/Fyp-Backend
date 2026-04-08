require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const { seedDatabase } = require('./seedData');

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Set MONGODB_URI in backend/.env');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('Connected');

  await seedDatabase();

  await mongoose.disconnect();
  console.log('Done');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
