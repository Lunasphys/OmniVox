import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import commandRoutes from './src/routes/commandRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/commands', commandRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
