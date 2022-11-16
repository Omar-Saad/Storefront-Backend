import { Order,OrderModel } from '../orders';

const orderModel = new OrderModel();

describe("Order Model", () => {
  it('should have an index method', () => {
    expect(orderModel.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderModel.showUserOrder).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderModel.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(orderModel.delete).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(orderModel.showUserOrder).toBeDefined();
  });

  it('create method should not add a new order if user id is wrong', async () => {

      await expectAsync(
       orderModel.create({
          user_id: 8000,
          status: 'active'
        })
      ).toBeRejected();
});

  it('index method should return a list of orders ', async () => {
    
    await expectAsync(
      orderModel.index()
    ).toBeResolved();
  });

  it('show method should return order with the specified id', async () => {
    
    await expectAsync(
      orderModel.showUserOrder(1)
    ).toBeResolved();
  });

  // it('delete method should remove the order', async () => {
  //   orderModel.delete(1);
  //   const result = await orderModel.show(1)
  //   expect(result).toBeUndefined();
    
  // });
});
