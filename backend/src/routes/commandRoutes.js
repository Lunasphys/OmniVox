import express from 'express';
import { logCommand, getCommandHistory } from '../controllers/commandController.js';

const router = express.Router();

/**
 * Route pour enregistrer une commande.
 * Méthode : POST
 * Endpoint : /api/commands
 */
router.post('/', logCommand);

/**
 * Route pour récupérer l'historique des commandes d'un utilisateur.
 * Méthode : GET
 * Endpoint : /api/commands/:userId
 */
router.get('/:userId', getCommandHistory);

export default router;
