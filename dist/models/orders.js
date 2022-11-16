"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    constructor() {
        this.tableName = 'orders';
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
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async showUserOrder(user_id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE user_id=($1)`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user order ${user_id}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [o.user_id, o.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order ${o.user_id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE id=($1) RETURNING *`;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderModel = OrderModel;
