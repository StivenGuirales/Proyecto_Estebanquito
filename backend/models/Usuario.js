const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  contrasena: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  numeroCuenta: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  tipoCuenta: {
    type: DataTypes.ENUM('ahorros', 'corriente'),
    defaultValue: 'ahorros'
  },
  saldo: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0.00
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'usuarios',
  hooks: {
    // Hook para encriptar la contraseña antes de guardar
    beforeCreate: async (usuario) => {
      if (usuario.contrasena) {
        const salt = await bcrypt.genSalt(10);
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
      }
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('contrasena')) {
        const salt = await bcrypt.genSalt(10);
        usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
      }
    }
  }
});

// Método para verificar contraseña
Usuario.prototype.verificarContrasena = async function(contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = Usuario;