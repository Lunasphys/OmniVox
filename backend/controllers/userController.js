const pool = require('../models/db');

const addUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    res.json({ insertId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add user.' });
  }
};

const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

module.exports = { addUser, getUsers };
