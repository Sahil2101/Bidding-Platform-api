const express = require('express');
const { getNotifications, markRead } = require('../controllers/notification');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, getNotifications);
router.post('/mark-read', auth, markRead);

module.exports = router;
