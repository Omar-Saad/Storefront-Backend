"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    constructor() {
        this.tableName = 'users';
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM ${this.tableName}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get exams. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id=($1)`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const pepper = process.env.BCRYPT_PASSWORD;
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(process.env.SALT_ROUNDS));
            const sql = `INSERT INTO ${this.tableName} (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *`;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE id=($1)`;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
    async authenticate(firstName, password) {
        const conn = await database_1.default.connect();
        const sql = `SELECT * FROM ${this.tableName} WHERE first_name=($1)`;
        const result = await conn.query(sql, [firstName]);
        if (result.rows.length) {
            const user = result.rows[0];
            const pepper = process.env.BCRYPT_PASSWORD;
            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserModel = UserModel;
