const express = require('express');
const { getBidsByItemId, createBid } = require('../controllers/bid');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.get('/:itemId/bids', getBidsByItemId);
router.post('/:itemId/bids', authMiddleware, createBid);

module.exports = router;
