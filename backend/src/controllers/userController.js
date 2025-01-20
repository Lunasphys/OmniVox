const pool = require('../model/db');

// userController.js
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

export const addUser = async (req, res) => {
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


module.exports = { addUser, getUsers };
