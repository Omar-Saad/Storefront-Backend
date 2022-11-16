"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes = express_1.default.Router();
const productModel = new product_1.ProductModel();
const index = async (req, res) => {
    try {
        const product = await productModel.index();
        res.json(product);
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
    const id = parseInt(req.params.id);
    if (!validateShow(id)) {
        res.status(400).json({ msg: 'Invalid id' });
        return;
    }
    try {
        const product = await productModel.show(id);
        res.json(product);
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
        const { name, price, category } = req.body;
        if (!validateCreate(name, price, category)) {
            res.status(400).json({ msg: 'Bad Request' });
            return;
        }
        const product = {
            name,
            price,
            category
        };
        const newProduct = await productModel.create(product);
        res.json(newProduct);
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
const validateCreate = (name, price, category) => {
    // check if fields are not null
    if (isNaN(price) || name === null || name === undefined || name === '' || category === null || category === undefined || category === '') {
        return false;
    }
    if (price < 0 || name.length === 0 || category.length === 0) {
        return false;
    }
    if (typeof name !== 'string' && typeof price !== 'number' || typeof category !== 'string') {
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
