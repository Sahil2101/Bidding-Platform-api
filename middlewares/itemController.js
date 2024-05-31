const upload = require('../middlewares/uploadMiddleware');

// Update createItem and updateItem methods to handle image upload
exports.createItem = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, description, starting_price, end_time } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;
      const item = await Item.create({ name, description, starting_price, end_time, current_price: starting_price, image_url });
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.updateItem = [
  upload.single('image'),
  async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Item not found' });
      
      const image_url = req.file ? `/uploads/${req.file.filename}` : item.image_url;
      await item.update({ ...req.body, image_url });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];
