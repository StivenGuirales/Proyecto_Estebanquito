const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Obtener token del header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      mensaje: 'No hay token, autorización denegada'
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      mensaje: 'Token no válido'
    });
  }
};

module.exports = verificarToken;