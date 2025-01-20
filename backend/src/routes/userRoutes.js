// backend/src/routes/userRoutes.js
const express = require('express');
const { getUsers, addUser } = require('../controllers/userController.js');  // Utilisation de `require()`

const router = express.Router();

// Définir les routes ici
router.get('/', getUsers);
router.post('/', addUser);

// Exportation par défaut
module.exports = router;
