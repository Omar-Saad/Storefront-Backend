import express from 'express';
import UsersApi from './user';
import ProductsApi from './products';
import OrdersApi from './orders';
import OrderProductsApi from './order_products';

const routes = express.Router();
routes.use('/users', UsersApi );
routes.use('/products', ProductsApi );
routes.use('/orders', OrdersApi );
routes.use('/order_products', OrderProductsApi );
export default routes;