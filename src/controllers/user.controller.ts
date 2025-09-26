import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    // Inyectamos el servicio en el constructor para que esté disponible en toda la clase
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // Usamos arrow functions para asegurar que 'this' se refiera a la instancia de la clase
    public getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios', error });
        }
    }

    public getUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const user = await this.userService.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario', error });
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: 'Error al crear el usuario', error });
        }
    }
}

// Exportamos una instancia de la clase para usarla en el archivo de rutas
export default new UserController();