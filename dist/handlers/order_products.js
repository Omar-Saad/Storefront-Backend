"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_product_1 = require("../models/order_product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes = express_1.default.Router();
const orderProductModel = new order_product_1.OrderProductModel();
const index = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (token == null || token == undefined || typeof token !== 'string') {
            res.status(400).json({ msg: 'Unauthorized.Token Not provided' });
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        res.status(401).json({ msg: 'Unauthorized' });
        return;
    }
    try {
        const orderProducts = await orderProductModel.index();
        res.json(orderProducts);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ msg: err.message });
        }
        else {
            res.status(404).json({ msg: 'Something went wrong' });
        }
    }
    // res.send('exams index');
};
const show = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (token == null || token == undefined || typeof token !== 'string') {
            res.status(400).json({ msg: 'Unauthorized.Token Not provided' });
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        res.status(401).json({ msg: 'Unauthorized' });
        return;
    }
    const order_id = parseInt(req.params.id);
    if (!validateShow(order_id)) {
        res.status(400).json({ msg: 'Invalid id' });
        return;
    }
    try {
        const orderProducts = await orderProductModel.showOrderProducts(order_id);
        res.json(orderProducts);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ msg: err.message });
        }
        else {
            res.status(400).json({ msg: 'Something went wrong' });
        }
    }
    // res.send('exams show');
};
const create = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (token == null || token == undefined || typeof token !== 'string') {
            res.status(400).json({ msg: 'Unauthorized.Token Not provided' });
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        res.status(401).json({ msg: 'Unauthorized' });
        return;
    }
    try {
        const { order_id, product_id, quantity } = req.body;
        if (!validateCreate(order_id, product_id, quantity)) {
            res.status(400).json({ msg: 'Bad Request' });
            return;
        }
        const order = {
            order_id: order_id,
            product_id: product_id,
            quantity,
        };
        const newOrder = await orderProductModel.create(order);
        res.json(newOrder);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ msg: err.message });
        }
        else {
            res.status(400).json({ msg: 'Something went wrong' });
        }
    }
};
routes.get('/', index);
routes.get('/:id', show);
routes.post('/create', create);
exports.default = routes;
const validateCreate = (orderId, productId, quantity) => {
    // check if id is null
    if (orderId === null) {
        return false;
    }
    // check if id is NaN
    if (isNaN(orderId)) {
        return false;
    }
    // check if id is a positive number
    if (orderId < 0) {
        return false;
    }
    // check if id is null
    if (productId === null) {
        return false;
    }
    // check if id is NaN
    if (isNaN(productId)) {
        return false;
    }
    // check if id is a positive number
    if (productId < 0) {
        return false;
    }
    // check if id is null
    if (quantity === null) {
        return false;
    }
    // check if id is NaN
    if (isNaN(quantity)) {
        return false;
    }
    // check if id is a positive number
    if (quantity < 0) {
        return false;
    }
    return true;
};
const validateShow = (id) => {
    // check if id is null
    if (id === null) {
        return false;
    }
    // check if id is NaN
    if (isNaN(id)) {
        return false;
    }
    // check if id is a positive number
    if (id < 0) {
        return false;
    }
    return true;
};
