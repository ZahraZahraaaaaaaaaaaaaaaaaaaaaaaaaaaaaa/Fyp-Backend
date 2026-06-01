const Notification = require('../models/Notification');
const { ensureStaticNotifications } = require('../services/notificationService');

function serialize(n) {
  return {
    id: n._id,
    title: n.title,
    message: n.message,
    type: n.type,
    isRead: n.isRead,
    createdAt: n.createdAt,
  };
}

async function list(req, res) {
  await ensureStaticNotifications(req.user._id);

  const notifications = await Notification.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const unreadCount = await Notification.countDocuments({
    userId: req.user._id,
    isRead: false,
  });

  return res.json({
    notifications: notifications.map(serialize),
    unreadCount,
  });
}

async function markRead(req, res) {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) return res.status(404).json({ message: 'Notification not found' });
  return res.json(serialize(notification));
}

async function markAllRead(req, res) {
  await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
  return res.json({ message: 'All notifications marked as read' });
}

module.exports = { list, markRead, markAllRead };
