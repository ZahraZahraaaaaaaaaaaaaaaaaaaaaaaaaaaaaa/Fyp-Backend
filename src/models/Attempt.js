const mongoose = require('mongoose');

const decisionEntrySchema = new mongoose.Schema(
  {
    stepNumber: Number,
    optionIndex: Number,
    isCorrect: Boolean,
    pointsEarned: Number,
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const attemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    scenarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scenario', required: true },
    decisionHistory: [decisionEntrySchema],
    score: { type: Number, default: 0 },
    correctDecisions: { type: Number, default: 0 },
    incorrectDecisions: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'abandoned'],
      default: 'in_progress',
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    currentStepNumber: { type: Number, default: 1 },
    /**
     * Stable per-attempt randomized order of stepNumbers.
     * Enables reshuffling on replay while keeping order fixed during a playthrough.
     */
    stepOrder: [{ type: Number }],
    /** Index into stepOrder for the current step */
    currentStepIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

attemptSchema.index({ userId: 1, scenarioId: 1, status: 1 });

module.exports = mongoose.model('Attempt', attemptSchema);
