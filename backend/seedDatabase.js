const { sequelize } = require('./config/database');
const Usuario = require('./models/Usuario');

const crearUsuariosPrueba = async () => {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await sequelize.authenticate();
    
    // Sincronizar tabla (crear si no existe)
    await sequelize.sync({ force: true }); // force: true recrea la tabla
    console.log('✅ Tabla de usuarios creada/actualizada');
    
    // Crear usuarios de prueba
    const usuarios = [
      {
        nombre: 'Juan Pérez García',
        email: 'juan.perez@email.com',
        contrasena: 'password123',
        numeroCuenta: '1234567890',
        tipoCuenta: 'ahorros',
        saldo: 2500000.00
      },
      {
        nombre: 'María López Rodríguez',
        email: 'maria.lopez@email.com',
        contrasena: 'maria2024',
        numeroCuenta: '0987654321',
        tipoCuenta: 'corriente',
        saldo: 5000000.00
      }
    ];
    
    for (const usuario of usuarios) {
      await Usuario.create(usuario);
      console.log(`Usuario creado: ${usuario.nombre} (${usuario.email})`);
    }
    
    console.log('\n Base de datos inicializada correctamente!');
    console.log('\n Usuarios de prueba creados:');
    console.log('----------------------------------------');
    console.log('Usuario 1:');
    console.log('  Email: juan.perez@email.com');
    console.log('  Contraseña: password123');
    console.log('----------------------------------------');
    console.log('Usuario 2:');
    console.log('  Email: maria.lopez@email.com');
    console.log('  Contraseña: maria2024');
    console.log('----------------------------------------\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error inicializando la base de datos:', error);
    process.exit(1);
  }
};

crearUsuariosPrueba();