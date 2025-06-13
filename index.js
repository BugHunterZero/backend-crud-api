const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

// Create - Add new user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read - Get all users
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Read - Get user by ID
app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: 'User not found' });
});

// Update - Modify user
app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else res.status(404).json({ error: 'User not found' });
});

// Delete - Remove user
app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'User deleted' });
  } else res.status(404).json({ error: 'User not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
