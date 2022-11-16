"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductModel {
    constructor() {
        this.tableName = 'order_products';
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
            throw new Error(`Could not get products of orders. Error: ${err}`);
        }
    }
    async showOrderProducts(orderId) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE order_id=($1)`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find products of order ${orderId}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            const sql = `INSERT INTO ${this.tableName} (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [o.order_id, o.product_id, o.quantity]);
            const student = result.rows[0];
            conn.release();
            return student;
        }
        catch (err) {
            throw new Error(`Could not add new order product ${o.order_id}. Error: ${err}`);
        }
    }
    async deleteProductFromOrder(orderId) {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE order_id=($1)`;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderId]);
            const student = result.rows[0];
            conn.release();
            return student;
        }
        catch (err) {
            throw new Error(`Could not delete product from order ${orderId}. Error: ${err}`);
        }
    }
}
exports.OrderProductModel = OrderProductModel;
