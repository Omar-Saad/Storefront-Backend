"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const userModel = new user_1.UserModel();
describe("User Model", () => {
    it('should have an index method', () => {
        expect(userModel.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(userModel.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(userModel.index).toBeDefined();
    });
    it('should have a update method', () => {
        expect(userModel.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(userModel.index).toBeDefined();
    });
    it('create method should add a user', async () => {
        await expectAsync(userModel.create({
            first_name: 'John',
            last_name: 'Doe',
            password: 'password'
        })).toBeResolved();
    });
    it('index method should return a list of users ', async () => {
        await expectAsync(userModel.index()).toBeResolved();
    });
    it('show method should return user with the specified id', async () => {
        await expectAsync(userModel.show(1)).toBeResolved();
    });
    // it('delete method should remove the user', async () => {
    //   userModel.delete(1);
    //   const result = await userModel.show(1)
    //   expect(result).toBeUndefined();
    // });
});
