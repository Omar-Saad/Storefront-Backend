import { Product, ProductModel } from '../product';

const productModel = new ProductModel();

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('create method should add a product', async () => {
    
    await expectAsync(
      productModel.create({
        name: 'product',
        price: 10.00,
        category: 'category'
    })).toBeResolved();
});

  it('index method should return a list of products ', async () => {
    
    await expectAsync(
      productModel.index()
    ).toBeResolved();

  });

  it('show method should return product with the specified id ', async () => {
    await expectAsync(
      productModel.show(1)
    ).toBeResolved();

  });

  // it('delete method should remove the product', async () => {
  //   productModel.delete(1);
  //   const result = await productModel.show(1)
  //   expect(result).toBeUndefined();
    
  // });
});
