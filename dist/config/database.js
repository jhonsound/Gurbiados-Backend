"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = exports.dataSourceOptions = void 0;
require("dotenv/config"); // Ideal para desarrollo local, no afecta en Render
const typeorm_1 = require("typeorm");
exports.dataSourceOptions = {
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
    entities: ['dist/models/**/*.js'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['dist/subscribers/**/*.js'],
};
// Se mantiene igual que en tu código original, ¡está perfecto!
exports.AppDataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.AppDataSource.initialize();
        console.log('Conexión a la base de datos establecida correctamente');
        return exports.AppDataSource;
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
});
exports.initializeDatabase = initializeDatabase;
