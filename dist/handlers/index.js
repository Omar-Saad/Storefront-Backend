"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const products_1 = __importDefault(require("./products"));
const orders_1 = __importDefault(require("./orders"));
const order_products_1 = __importDefault(require("./order_products"));
const routes = express_1.default.Router();
routes.use('/users', user_1.default);
routes.use('/products', products_1.default);
routes.use('/orders', orders_1.default);
routes.use('/order_products', order_products_1.default);
exports.default = routes;
