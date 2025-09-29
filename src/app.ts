import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'reflect-metadata';

// Configurar variables de entorno
dotenv.config();

// Importar rutas
import indexRoutes from './routes/index.routes';

// Importar configuración de base de datos
import { initializeDatabase } from './config/database';

// Inicializar app
const app: Application = express();

// Configuración
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/', indexRoutes);

/* // Ruta de inicio
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Bienvenido a la API de Gurbiados',
    status: 'API funcionando correctamente'
  });
}); */

// Inicializar la base de datos y el servidor
const startServer = async () => {
  try {
    // Inicializar la conexión a la base de datos
    await initializeDatabase();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();

module.exports = app;