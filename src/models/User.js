const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    totalScore: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    earnedBadges: [{ type: String }],
    completedScenarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scenario' }],
    /** Last N scenario type results for recommendations: { type, accuracy } */
    performanceSnapshot: [
      {
        scenarioType: String,
        accuracy: Number,
        at: { type: Date, default: Date.now },
      },
    ],
    /** Consecutive correct decisions across scenarios (resets on wrong choice) */
    correctStreak: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
