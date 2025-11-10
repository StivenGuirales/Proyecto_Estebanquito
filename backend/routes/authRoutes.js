const express = require('express');
const router = express.Router();
const { login, registro, obtenerPerfil } = require('../controllers/authController');
const verificarToken = require('../middleware/auth');

// Rutas públicas (no requieren autenticación)
router.post('/login', login);
router.post('/registro', registro);

// Rutas protegidas (requieren autenticación)
router.get('/perfil', verificarToken, obtenerPerfil);

module.exports = router;