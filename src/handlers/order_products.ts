import express, { Request, Response } from 'express';
import { OrderProduct, OrderProductModel} from '../models/order_product';
import jwt from 'jsonwebtoken';

const routes = express.Router();

const orderProductModel = new OrderProductModel();

const index = async (req: Request, res: Response): Promise<void> => {
      
    try{
        const token = req.headers.authorization;
        if(token==null || token==undefined || typeof token !== 'string'){
            res.status(400).json({ msg: 'Unauthorized.Token Not provided' });
            return;
        }
        jwt.verify(token, process.env.JWT_SECRET as string);
    }
    catch(err){
        res.status(401).json({ msg: 'Unauthorized' });
        return;
    }

   try {
    const orderProducts = await orderProductModel.index();
    res.json(orderProducts);
    } catch (err) {
    
        if (err instanceof Error) {
            res.status(404).json({ msg: err.message });
        }
        else
        {
            res.status(404).json({ msg: 'Something went wrong' });
        }

    }
    // res.send('exams index');
};

const show = async (req: Request, res: Response): Promise<void> => {
      
    try{
        const token = req.headers.authorization;
        if(token==null || token==undefined || typeof token !== 'string'){
            res.status(400).json({ msg: 'Unauthorized.Token Not provided' });
            return;
        }
        jwt.verify(token, process.env.JWT_SECRET as string);
    }
    catch(err){
        res.status(401).json({ msg: 'Unauthorized' });
        return;
    }

    const order_id = parseInt(req.params.id);
    if(!validateShow(order_id)){
        res.status(400).json({ msg: 'Invalid id' });
        return;
    }
    try {
        const orderProducts = await orderProductModel.showOrderProducts(order_id);
        res.json(orderProducts);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ msg: err.message });
        }
        else
        {
            res.status(400).json({ msg: 'Something went wrong' });
        }
    }
    // res.send('exams show');
};

const create = async (req: Request, res: Response): Promise<void> => {
      
    try{
        const token = req.headers.authorization;
        if(token==null || token==undefined || typeof token !== 'string'){
            res.status(400).json({ msg: 'Unauthorized.Token Not provided' });
            return;
        }
        jwt.verify(token, process.env.JWT_SECRET as string);
    }
    catch(err){
        res.status(401).json({ msg: 'Unauthorized' });
        return;
    }

    try {
        
        const { order_id, product_id, quantity} = req.body;
       
        if(!validateCreate(order_id, product_id ,quantity )){
            res.status(400).json({ msg: 'Bad Request' });
            return;
        }
        
        const order: OrderProduct = {
            order_id: order_id,
            product_id: product_id,
            quantity,
        };
        const newOrder = await orderProductModel.create(order);
        res.json(newOrder);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ msg: err.message });
        }
        else
        {
            res.status(400).json({ msg: 'Something went wrong' });
        }
    }

};




routes.get('/', index);
routes.get('/:id', show);
routes.post('/create', create);


export default routes;



const validateCreate = (orderId:number,productId:number , quantity:number): boolean => {
    // check if id is null
    if (orderId === null) {
        return false;
    }
    // check if id is NaN
    if (isNaN(orderId)) {
        return false;
    }
    // check if id is a positive number
    if (orderId < 0) {
        return false;
    }
    // check if id is null
    if (productId === null) {
        return false;
    }
    // check if id is NaN

    if (isNaN(productId)) {
        return false;
    }
    // check if id is a positive number
    if (productId < 0) {
        return false;
    }
    // check if id is null
    if (quantity === null) {
        return false;
    }
    // check if id is NaN
    if (isNaN(quantity)) {
        return false;
    }
    // check if id is a positive number
    if (quantity < 0) {
        return false;
    }
    return true;

 
};

const validateShow = (id: number): boolean=> {
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