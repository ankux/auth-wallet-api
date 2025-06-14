const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Authorization required' });
  }

  const base64 = authHeader.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString();
  const [username, password] = decoded.split(':');

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  req.user = user;
  next();
};
