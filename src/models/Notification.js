const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: [
        'badge_earned',
        'scenario_completed',
        'level_up',
        'daily_challenge',
        'training_reminder',
        'security_tip',
        'welcome',
        'badges_progress',
      ],
    },
    isRead: { type: Boolean, default: false },
    /** Dedupes static notifications per user */
    staticKey: { type: String, default: null },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index(
  { userId: 1, staticKey: 1 },
  { unique: true, partialFilterExpression: { staticKey: { $type: 'string' } } }
);

module.exports = mongoose.model('Notification', notificationSchema);
