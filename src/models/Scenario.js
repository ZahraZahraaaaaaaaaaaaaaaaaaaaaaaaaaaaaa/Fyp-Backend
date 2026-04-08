const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema(
  {
    optionText: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    consequenceText: { type: String, default: '' },
    feedbackText: { type: String, required: true },
    points: { type: Number, default: 0 },
    nextStepNumber: { type: Number, required: true },
    /** Full-screen simulation before feedback when wrong */
    simulationType: {
      type: String,
      enum: [
        'none',
        'phishing_alert',
        'unauthorized_login',
        'system_lock',
        'ransomware',
        'data_exfiltration',
        'malware',
        'vishing_breach',
        'impersonation_success',
      ],
      default: 'none',
    },
    simulationTitle: { type: String, default: '' },
    simulationLines: [{ type: String }],
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema(
  {
    stepNumber: { type: Number, required: true },
    content: { type: String, required: true },
    contextLabel: { type: String, default: '' },
    isFinalStep: { type: Boolean, default: false },
    options: { type: [optionSchema], validate: [(v) => v.length > 0, 'Step needs options'] },
  },
  { _id: false }
);

const scenarioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['phishing', 'vishing', 'baiting', 'impersonation', 'invoice_scam', 'mixed'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    description: { type: String, default: '' },
    estimatedTime: { type: Number, default: 10 },
    isActive: { type: Boolean, default: true },
    steps: {
      type: [stepSchema],
      validate: [(v) => v.length > 0, 'Scenario needs steps'],
    },
  },
  { timestamps: true }
);

scenarioSchema.index({ isActive: 1, difficulty: 1, type: 1 });

module.exports = mongoose.model('Scenario', scenarioSchema);
