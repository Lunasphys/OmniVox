import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import externalRoutes from './src/routes/externalRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', externalRoutes);
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
