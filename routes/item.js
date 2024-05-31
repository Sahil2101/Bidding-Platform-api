const express = require('express');
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemBids,
  placeBid,
} = require('../controllers/item');
const auth = require('../middlewares/auth');
const { isAdminOrOwner } = require('../middlewares/role');
const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', auth, createItem);
router.put('/:id', auth, isAdminOrOwner, updateItem);
router.delete('/:id', auth, isAdminOrOwner, deleteItem);
router.get('/:itemId/bids', getItemBids);
router.post('/:itemId/bids', auth, placeBid);

module.exports = router;
