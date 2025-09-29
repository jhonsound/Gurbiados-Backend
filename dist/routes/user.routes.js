"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Importamos la instancia por defecto del controlador, no las funciones individuales
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = (0, express_1.Router)();
// Las rutas ahora llaman a los métodos de la instancia del controlador
userRouter.get('/', user_controller_1.default.getUsers);
userRouter.get('/:id', user_controller_1.default.getUserById);
userRouter.post('/', user_controller_1.default.createUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);
exports.default = userRouter;
