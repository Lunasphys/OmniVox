const express = require('express');
const cors = require('cors');

import dotenv from 'dotenv';
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const commandRoutes = require('./routes/commandRoutes');

const app = express();
const PORT = 3000;

// Middleware
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/commands', commandRoutes);

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
