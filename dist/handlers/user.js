"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes = express_1.default.Router();
const userModel = new user_1.UserModel();
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
        const users = await userModel.index();
        res.json(users);
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
    if (!validateShow(id)) {
        res.status(400).json({ msg: 'Invalid id' });
        return;
    }
    try {
        const user = await userModel.show(id);
        res.json(user);
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
        const { first_name, last_name, password } = req.body;
        if (!validateCreate(first_name, last_name, password)) {
            res.status(400).json({ msg: 'Bad Request' });
            return;
        }
        const user = {
            first_name: first_name,
            last_name: last_name,
            password
        };
        const newUser = await userModel.create(user);
        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_SECRET);
        newUser.token = token;
        res.json(newUser);
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
const signIn = async (req, res) => {
    try {
        const { first_name, password } = req.body;
        const user = await userModel.authenticate(first_name, password);
        if (user === null) {
            res.status(400).json({ msg: 'Wrong user name or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_SECRET);
        user.token = token;
        res.json(user);
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
routes.post('/signin', signIn);
exports.default = routes;
const validateCreate = (firstName, lastName, password) => {
    // check if fields are nulls
    if (firstName === null || lastName === null || password === null) {
        return false;
    }
    // check if types are correct
    if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof password !== 'string') {
        return false;
    }
    // check if fields are empty
    if (firstName === '' || lastName === '' || password === '') {
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
