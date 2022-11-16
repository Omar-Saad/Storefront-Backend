"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const req = (0, supertest_1.default)(server_1.default);
describe('Test Endpoints', () => {
    describe('Test /users endpoint', () => {
        it('should return 401 unauthorized if no token provided', async () => {
            // add token to header and send request
            const res = await req.get('/users');
            expect(res.status).toBe(400);
        });
        it('/users/{id} should return 400 if no token provided', async () => {
            const res = await req.get('/users/1');
            expect(res.status).toBe(400);
        });
        it('/users/create should return 400 if no user provided in body while creating new one', async () => {
            const res = await req.post('/users/create');
            expect(res.status).toBe(400);
        });
    });
    describe('Test /products endpoint', () => {
        it('should return 200 if list of products returend', async () => {
            const res = await req.get('/products');
            expect(res.status).toBe(200);
        });
        it('/products/{id} should return 200 if a product with specified id returned', async () => {
            const res = await req.get('/products/1');
            expect(res.status).toBe(200);
        });
        it('products/create should return 400 if no token provided in body while creating new product', async () => {
            const res = await req.post('/products/create');
            expect(res.status).toBe(400);
        });
    });
    describe('Test /orders endpoint', () => {
        it('should return 400 if no token provided while retriving all orders', async () => {
            const res = await req.get('/orders');
            expect(res.status).toBe(400);
        });
        it('/orders/{id} should return 400 if no token provided while retriving a specific order', async () => {
            const res = await req.get('/orders/1');
            expect(res.status).toBe(400);
        });
        it('orders/create should return 400 if no token provided in body while creating new order', async () => {
            const res = await req.post('/orders/create');
            expect(res.status).toBe(400);
        });
    });
    describe('Test /order_products endpoint', () => {
        it('should return 400 if no token provided while retriving all products of all orders', async () => {
            const res = await req.get('/order_products');
            expect(res.status).toBe(400);
        });
        it('/order_products/{user_id} should return 400 if no token provided while retriving products of a user order', async () => {
            const res = await req.get('/order_products/1');
            expect(res.status).toBe(400);
        });
        it('order_products/create should return 400 if no token provided in body while adding products to an order', async () => {
            const res = await req.post('/order_products/create');
            expect(res.status).toBe(400);
        });
    });
});
