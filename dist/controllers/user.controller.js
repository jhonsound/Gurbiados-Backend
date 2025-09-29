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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        // Usamos arrow functions para asegurar que 'this' se refiera a la instancia de la clase
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.findAll();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener los usuarios', error });
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.userService.findById(id);
                if (!user) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener el usuario', error });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.create(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                res.status(400).json({ message: 'Error al crear el usuario', error });
            }
        });
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
// Exportamos una instancia de la clase para usarla en el archivo de rutas
exports.default = new UserController();
