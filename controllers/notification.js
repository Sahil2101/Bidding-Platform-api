const Notification = require('../models/notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve notifications' });
  }
};

exports.markRead = async (req, res) => {
  try {
    await Notification.update(
      { isRead: true },
      {
        where: {
          userId: req.user.id,
          isRead: false,
        },
      }
    );
    res.status(200).send({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to mark notifications as read' });
  }
};
