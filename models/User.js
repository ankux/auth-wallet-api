const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  kind: { type: String, enum: ['credit', 'debit'], required: true },
  amt: { type: Number, required: true },
  updated_bal: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

module.exports = mongoose.model('User', userSchema);

