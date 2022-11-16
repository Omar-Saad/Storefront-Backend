"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_1 = require("../order_product");
const orderProductModel = new order_product_1.OrderProductModel();
describe("Order Product Model", () => {
    it('should have an index method', () => {
        expect(orderProductModel.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(orderProductModel.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(orderProductModel.index).toBeDefined();
    });
    it('should have a update method', () => {
        expect(orderProductModel.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(orderProductModel.index).toBeDefined();
    });
    it('create method should not add a new product to order if order id is wrong', async () => {
        await expectAsync(orderProductModel.create({
            order_id: 8000,
            product_id: 1,
            quantity: 1
        })).toBeRejected();
    });
    it('index method should return a list of orders products ', async () => {
        await expectAsync(orderProductModel.index()).toBeResolved();
    });
    it('show method should return products with the specified order id', async () => {
        await expectAsync(orderProductModel.showOrderProducts(1)).toBeResolved();
    });
});
