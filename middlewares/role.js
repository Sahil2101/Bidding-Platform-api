const Item  = require('../models/item');

module.exports.isAdminOrOwner = async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const item = await Item.findOne({ where: { id } });
  if (req.user.role !== 'admin' && item.userId !== userId) {
    return res.status(403).send({ error: 'Not authorized.' });
  }
  next();
};
