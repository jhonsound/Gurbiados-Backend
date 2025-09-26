// src/routes/index.routes.ts (ESTO ES CORRECTO)
import { Router } from 'express';
import userRoutes from './user.routes';
import orderRoutes from './order.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

export default router;