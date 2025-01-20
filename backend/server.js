// backend/src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/userRoutes.js';
import commandRoutes from './src/routes/commandRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/commands', commandRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
