const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  totalAmount: {
    type: Number
  },
  customerDetail: {
    type: Object
  },
  totalItems: {
    type: Number
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;