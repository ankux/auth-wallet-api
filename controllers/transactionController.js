const User = require('../models/User');
const axios = require('axios');

exports.fund = async (req, res) => {
  const { amt } = req.body;

  if (!amt || amt <= 0) return res.status(400).json({ error: 'Invalid amount' });

  req.user.balance += amt;
  req.user.transactions.unshift({
    kind: 'credit',
    amt,
    updated_bal: req.user.balance,
  });

  await req.user.save();
  res.status(200).json({ balance: req.user.balance });
};

exports.pay = async (req, res) => {
  const { to, amt } = req.body;

  if (!to || !amt || amt <= 0) {
    return res.status(400).json({ error: 'Invalid recipient or amount' });
  }

  if (req.user.username === to) {
    return res.status(400).json({ error: 'Cannot pay yourself' });
  }

  if (req.user.balance < amt) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }

  const recipient = await User.findOne({ username: to });
  if (!recipient) return res.status(400).json({ error: 'Recipient not found' });

  req.user.balance -= amt;
  recipient.balance += amt;

  req.user.transactions.unshift({
    kind: 'debit',
    amt,
    updated_bal: req.user.balance,
  });

  recipient.transactions.unshift({
    kind: 'credit',
    amt,
    updated_bal: recipient.balance,
  });

  await req.user.save();
  await recipient.save();

  res.status(200).json({ balance: req.user.balance });
};

exports.balance = async (req, res) => {
  const currency = req.query.currency || 'INR';

  if (currency === 'INR') {
    return res.status(200).json({ balance: req.user.balance });
  }

  try {
    const { data } = await axios.get(`https://open.er-api.com/v6/latest/${currency}`);
    const rate = data.rates['INR'];

    if (!rate) return res.status(500).json({ error: 'Conversion rate unavailable' });

    const converted = req.user.balance / rate;
    res.status(200).json({ balance: parseFloat(converted.toFixed(2)), currency });
  } catch (err) {
    res.status(500).json({ error: 'Currency conversion failed' });
  }
};

exports.statement = async (req, res) => {
  res.status(200).json(req.user.transactions);
};
