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
exports.OrderController = void 0;
const order_service_1 = require("../services/order.service");
class OrderController {
    constructor() {
        this.getOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.orderService.findAll();
                console.log("🚀 ~ OrderController ~ orders:", orders);
                res.status(200).json(orders);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener las órdenes', error });
            }
        });
        this.getOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const order = yield this.orderService.findById(id);
                if (!order) {
                    return res.status(404).json({ message: 'Orden no encontrada' });
                }
                res.status(200).json(order);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener la orden', error });
            }
        });
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrder = yield this.orderService.create(req.body);
                res.status(201).json(newOrder);
            }
            catch (error) {
                if (error instanceof Error && error.message === 'Usuario no encontrado') {
                    return res.status(404).json({ message: error.message });
                }
                res.status(400).json({ message: 'Error al crear la orden', error });
            }
        });
        this.orderService = new order_service_1.OrderService();
    }
}
exports.OrderController = OrderController;
// Exportamos una instancia
exports.default = new OrderController();
