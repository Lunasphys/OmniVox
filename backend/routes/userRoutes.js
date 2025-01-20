const express = require('express');
const { addUser, getUsers } = require('../controllers/userController.js');

const router = express.Router();

router.post('/', addUser);
router.get('/', getUsers);

module.exports = router;
