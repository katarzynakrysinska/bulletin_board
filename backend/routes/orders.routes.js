const express = require('express');
const router = express.Router();

const Order = require('../models/order.model');

router.get('/orders', async (req, res) => {
  try {
    const result = await Order.find();
    
    if(!result) res.status(404).json({ product: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/orders', async (req, res) => {
  try {
    const { order } = req.body;
    const NewPost = new Order({ order });
    await NewPost.save();
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;