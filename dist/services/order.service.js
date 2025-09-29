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
exports.OrderService = void 0;
const database_1 = require("../config/database"); // Asumiendo que tienes un archivo de configuración de TypeORM
const Order_1 = require("../models/Order"); // Importa la entidad Order
const User_1 = require("../models/User"); // Importa la entidad User para la relación
class OrderService {
    constructor() {
        this.orderRepository = database_1.AppDataSource.getRepository(Order_1.Order);
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User); // Necesitamos el repo de User
    }
    // Servicio para encontrar todas las órdenes.
    // Usamos 'relations' para que TypeORM traiga también la información del usuario asociado.
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("🚀 ~ file: order.service.ts:25 ~ OrderService ~ findAll ~ this.orderRepository:");
            try {
                const test = yield this.orderRepository.find();
                console.log("🚀 ~ file: order.service.ts:27 ~ OrderService ~ findAll ~ test:", test);
                return test;
            }
            catch (error) {
                console.log("🚀 ~ OrderService ~ findAll ~ error:", error);
                throw error;
            }
        });
    }
    // Servicio para encontrar una orden por su ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.findOne({
                where: { id: id },
                relations: ['user']
            });
        });
    }
    // Servicio para crear una nueva orden
    create(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Buscamos el usuario al que se le asignará la orden
            /* const user = await this.userRepository.findOneBy({ id: orderData.userId });
            
            if (!user) {
                // Si el usuario no existe, lanzamos un error.
                // El controlador se encargará de capturarlo y enviar una respuesta 404.
                throw new Error('Usuario no encontrado');
            } */
            orderData.userId = Math.random().toString(36).substring(2, 15);
            // 2. Creamos la instancia de la orden
            const newOrder = this.orderRepository.create(orderData);
            console.log("🚀 ~ OrderService ~ create ~ newOrder:", newOrder);
            // 3. Guardamos la nueva orden en la base de datos
            return this.orderRepository.save(newOrder);
        });
    }
}
exports.OrderService = OrderService;
