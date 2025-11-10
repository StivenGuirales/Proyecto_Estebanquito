const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Generar JWT
const generarJWT = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Login de usuario
const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    // Validar que vengan los datos
    if (!email || !contrasena) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor ingrese email y contraseña'
      });
    }

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ 
      where: { email: email.toLowerCase() }
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales incorrectas'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        mensaje: 'Usuario inactivo. Contacte al administrador'
      });
    }

    // Verificar contraseña
    const contrasenaValida = await usuario.verificarContrasena(contrasena);

    if (!contrasenaValida) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales incorrectas'
      });
    }

    // Generar token JWT
    const token = generarJWT(usuario.id, usuario.email);

    // Responder con los datos del usuario (sin la contraseña)
    res.json({
      success: true,
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        numeroCuenta: usuario.numeroCuenta,
        tipoCuenta: usuario.tipoCuenta,
        saldo: usuario.saldo
      },
      token
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error en el servidor'
    });
  }
};

// Registro de usuario
const registro = async (req, res) => {
  try {
    const { nombre, email, contrasena, numeroCuenta, tipoCuenta } = req.body;

    // Validar datos requeridos
    if (!nombre || !email || !contrasena || !numeroCuenta) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor complete todos los campos requeridos'
      });
    }

    // Verificar si el email ya existe
    const emailExiste = await Usuario.findOne({ 
      where: { email: email.toLowerCase() }
    });

    if (emailExiste) {
      return res.status(400).json({
        success: false,
        mensaje: 'El email ya está registrado'
      });
    }

    // Verificar si el número de cuenta ya existe
    const cuentaExiste = await Usuario.findOne({ 
      where: { numeroCuenta }
    });

    if (cuentaExiste) {
      return res.status(400).json({
        success: false,
        mensaje: 'El número de cuenta ya está registrado'
      });
    }

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email: email.toLowerCase(),
      contrasena,
      numeroCuenta,
      tipoCuenta: tipoCuenta || 'ahorros',
      saldo: 1500000 // Saldo inicial de regalo
    });

    // Generar token
    const token = generarJWT(nuevoUsuario.id, nuevoUsuario.email);

    res.status(201).json({
      success: true,
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        numeroCuenta: nuevoUsuario.numeroCuenta,
        tipoCuenta: nuevoUsuario.tipoCuenta,
        saldo: nuevoUsuario.saldo
      },
      token
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al registrar usuario'
    });
  }
};

// Obtener perfil del usuario (requiere autenticación)
const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: { exclude: ['contrasena'] }
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      usuario
    });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error obteniendo perfil'
    });
  }
};

module.exports = {
  login,
  registro,
  obtenerPerfil
};