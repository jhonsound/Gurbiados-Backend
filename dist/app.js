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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
// Configurar variables de entorno
dotenv_1.default.config();
// Importar rutas
const index_routes_1 = __importDefault(require("./routes/index.routes"));
// Importar configuración de base de datos
const database_1 = require("./config/database");
// Inicializar app
const app = (0, express_1.default)();
// Configuración
const PORT = parseInt(process.env.PORT || '3000', 10);
// Middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Rutas
app.use('/', index_routes_1.default);
/* // Ruta de inicio
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Bienvenido a la API de Gurbiados',
    status: 'API funcionando correctamente'
  });
}); */
// Inicializar la base de datos y el servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Inicializar la conexión a la base de datos
        yield (0, database_1.initializeDatabase)();
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
});
startServer();
module.exports = app;
