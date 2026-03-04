const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');
const readUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const users = readUsers();

    // ✅ Use 'decoded.id', not 'decoded.userId'
    const user = users.find(u => u.id === decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user; // Attach to req object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token failed' });
  }
};
