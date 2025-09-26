import { Router } from 'express';
import orderController from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.get('/', orderController.getOrders);
orderRouter.get('/:id', orderController.getOrderById);
orderRouter.post('/', orderController.createOrder);
// router.put('/:id', orderController.updateOrder);

export default orderRouter;