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
exports.UserService = void 0;
const database_1 = require("../config/database"); // Asumiendo que tienes un archivo de configuración de TypeORM
const User_1 = require("../models/User"); // Importa tu entidad
// Generalmente se usa una clase para encapsular la lógica y el repositorio
class UserService {
    constructor() {
        // Obtenemos el repositorio de la entidad User
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
    }
    // Servicio para encontrar todos los usuarios
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    // Servicio para encontrar un usuario por ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // findOneBy es más moderno y seguro que findOne(id)
            const user = yield this.userRepository.findOneBy({ id: id });
            return user;
        });
    }
    // Servicio para crear un nuevo usuario
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Creamos una nueva instancia de la entidad
            const newUser = this.userRepository.create(userData);
            // Guardamos la entidad en la base de datos
            return this.userRepository.save(newUser);
        });
    }
    // Servicio para actualizar un usuario
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            if (!user) {
                return null; // O lanzar un error
            }
            // Mezcla los datos existentes con los nuevos
            this.userRepository.merge(user, userData);
            return this.userRepository.save(user);
        });
    }
    // Servicio para eliminar un usuario
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.delete(id);
            // delete devuelve un objeto DeleteResult, verificamos si algo fue afectado
            return result.affected !== 0;
        });
    }
}
exports.UserService = UserService;
