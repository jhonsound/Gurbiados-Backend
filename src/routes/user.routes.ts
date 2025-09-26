import { Router } from 'express';
// Importamos la instancia por defecto del controlador, no las funciones individuales
import userController from '../controllers/user.controller';

const userRouter = Router();

// Las rutas ahora llaman a los métodos de la instancia del controlador
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

export default userRouter;