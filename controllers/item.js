const Item = require('../models/item');
const Bid = require('../models/bid');
const Notification = require('../models/notification');
const { Op } = require('sequelize');
const { io } = require('../index');

exports.getAllItems = async (req, res) => {
  const { page = 1, limit = 10, search, status } = req.query;
  const offset = (page - 1) * limit;
  const where = {};

  if (search) {
    where.name = { [Op.iLike]: `%${search}%` };
  }

  if (status === 'active') {
    where.endTime = { [Op.gt]: new Date() };
  } else if (status === 'ended') {
    where.endTime = { [Op.lte]: new Date() };
  }

  try {
    const items = await Item.findAndCountAll({ where, limit, offset });
    res.send({ items: items.rows, total: items.count });
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve items' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    res.send(item);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve item' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description, startingPrice, endTime } = req.body;
    const item = await Item.create({
      name,
      description,
      startingPrice,
      currentPrice: startingPrice,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      endTime,
      userId: req.user.id,
    });
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send({ error: 'Failed to create item' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, description, startingPrice, endTime } = req.body;
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    item.name = name || item.name;
    item.description = description || item.description;
    item.startingPrice = startingPrice || item.startingPrice;
    item.endTime = endTime || item.endTime;
    if (req.file) {
      item.imageUrl = `/uploads/${req.file.filename}`;
    }
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    await item.destroy();
    res.send({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete item' });
  }
};

exports.getItemBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { itemId: req.params.itemId } });
    res.send(bids);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve bids' });
  }
};

exports.placeBid = async (req, res) => {
  try {
    const { bidAmount } = req.body;
    const item = await Item.findByPk(req.params.itemId);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    if (bidAmount <= item.currentPrice) {
      return res.status(400).send({ error: 'Bid must be higher than the current price' });
    }
    const bid = await Bid.create({ itemId: item.id, userId: req.user.id, bidAmount });
    item.currentPrice = bidAmount;
    await item.save();

    // Notify other users
    io.emit('update', { itemId: item.id, bidAmount });

    // Notify item owner
    const notificationMessage = `Your item "${item.name}" has received a new bid of $${bidAmount}`;
    await Notification.create({ userId: item.userId, message: notificationMessage });
    io.emit('notify', { userId: item.userId, message: notificationMessage });

    res.status(201).send(bid);
  } catch (error) {
    res.status(400).send({ error: 'Failed to place bid' });
  }
};
