"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.routes.ts (ESTO ES CORRECTO)
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
const router = (0, express_1.Router)();
router.use('/users', user_routes_1.default);
router.use('/orders', order_routes_1.default);
exports.default = router;
