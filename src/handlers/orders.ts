import express, { Request, Response } from 'express';
import { Order,OrderModel } from '../models/orders';
import jwt from 'jsonwebtoken'; 

const routes = express.Router();

const orderModel = new OrderModel();

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
    const order = await orderModel.index();
    res.json(order);
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

    const user_id = parseInt(req.params.user_id);
    if(!validateShow(user_id)){
        res.status(400).json({ msg: 'Invalid id' });
        return;
    }
    try {
        const order = await orderModel.showUserOrder(user_id);
        res.json(order);
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
        
        const { user_id, status } = req.body;
       
        if(!validateCreate(user_id, status)){
            res.status(400).json({ msg: 'Bad Request' });
            return;
        }
        
        const order: Order = {
            user_id: user_id,
            status,
        };
        const newOrder = await orderModel.create(order);
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
routes.get('/:user_id', show);
routes.post('/create', create);


export default routes;



const validateCreate = (userId:number , status:string): boolean => {
    // check if id is null
    if (userId === null) {
        return false;
    }
    // check if id is NaN
    if (isNaN(userId)) {
        return false;
    }
    
    // check if id is a positive number
    if (userId < 0) {
        return false;
    }
    // check if id is null
    if (status === null) {
        return false;
    }
    if (typeof status !== 'string') {
        return false;
    }
    
    // check if id is a positive number
    if (status =='') {
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