const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const usersPath = path.join(__dirname, '../data/users.json');

// Helper to read users
const readUsers = () => {
  const data = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(data);
};

// Helper to write users
const writeUsers = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

// @desc    Get all users
// @route   GET /api/users
// @access  Admin only
const getAllUsers = (req, res) => {
  const users = readUsers();
  res.json(users.map(u => ({ ...u, password: undefined })));
};

// @desc    Add new user
// @route   POST /api/users
// @access  Admin only
const createUser = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const users = readUsers();
  const emailExists = users.some(u => u.email === email);
  if (emailExists) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    isAdmin: role === 'admin',
    isActive: true,
  };

  users.push(newUser);
  writeUsers(users);

  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ message: 'User created', user: userWithoutPassword });
};

// @desc    Update user (status or role)
// @route   PATCH /api/users/:id
// @access  Admin only
const updateUser = (req, res) => {
  const users = readUsers();
  const { id } = req.params;
  const { name, email, isAdmin, isActive } = req.body;

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = {
    ...users[userIndex],
    name: name ?? users[userIndex].name,
    email: email ?? users[userIndex].email,
    isAdmin: typeof isAdmin === 'boolean' ? isAdmin : users[userIndex].isAdmin,
    isActive: typeof isActive === 'boolean' ? isActive : users[userIndex].isActive,
  };

  users[userIndex] = updatedUser;
  writeUsers(users);

  res.json({ message: 'User updated', user: { ...updatedUser, password: undefined } });
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Admin only
const deleteUser = (req, res) => {
  const users = readUsers();
  const { id } = req.params;

  const userExists = users.some((u) => u.id === id);
  if (!userExists) {
    return res.status(404).json({ message: 'User not found' });
  }

  const filteredUsers = users.filter((u) => u.id !== id);
  writeUsers(filteredUsers);

  res.json({ message: 'User deleted successfully' });
};
// @desc    Get current logged-in user profile
// @route   GET /api/users/me
// @access  Private (authenticated user)
const getMe = (req, res) => {
  const users = readUsers();
  const currentUser = users.find(u => u.id === req.user.id);
  if (!currentUser) return res.status(404).json({ message: 'User not found' });

  const { password, ...userData } = currentUser;
  res.json(userData);
};

// @desc    Update current user's profile
// @route   PATCH /api/users/me
// @access  Private (authenticated user)
const updateMe = (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === req.user.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const user = users[userIndex];
  const { name, phone, shippingAddress } = req.body;

  user.name = name ?? user.name;
  user.phone = phone ?? user.phone;
  user.shippingAddress = {
    address: shippingAddress?.address ?? user.shippingAddress?.address ?? '',
    city: shippingAddress?.city ?? user.shippingAddress?.city ?? '',
    postalCode: shippingAddress?.postalCode ?? user.shippingAddress?.postalCode ?? '',
    country: shippingAddress?.country ?? user.shippingAddress?.country ?? ''
  };

  users[userIndex] = user;
  writeUsers(users);

  const { password, ...safeUser } = user;
  res.json(safeUser);
};



module.exports = {
  getAllUsers,
  createUser,   
  updateUser,
  deleteUser,
  getMe,       
  updateMe 
};
