import express from 'express';
import { getUsers, addUser } from '../controllers/userController.ts';

const router = express.Router();

// Définissez vos routes ici
router.get('/', getUsers);
router.post('/', addUser);

// Export par défaut
export default router;
