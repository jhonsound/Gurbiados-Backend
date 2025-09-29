import 'dotenv/config'; // Ideal para desarrollo local, no afecta en Render
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',

  // 1. Usamos la URL de conexión completa. Es más simple y estándar.
  // TypeORM la leerá de la variable de entorno que configures en Render.
  url: process.env.DATABASE_URL,

  // 2. AÑADIMOS LA CONFIGURACIÓN SSL (OBLIGATORIO PARA RENDER)
  ssl: {
    rejectUnauthorized: false,
  },

  // 3. CAMBIAMOS SYNCHRONIZE A FALSE (POR SEGURIDAD EN PRODUCCIÓN)
  synchronize: false,

  logging: process.env.NODE_ENV !== 'production',

  // 4. CORREGIMOS LAS RUTAS PARA QUE APUNTEN A LOS ARCHIVOS .JS EN 'dist'
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['dist/subscribers/**/*.js'],
};

// Se mantiene igual que en tu código original, ¡está perfecto!
export const AppDataSource = new DataSource(dataSourceOptions);

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conexión a la base de datos establecida correctamente');
    return AppDataSource;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};