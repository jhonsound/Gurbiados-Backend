import { log } from "node:console";
import { AppDataSource } from "../config/database"; // Asumiendo que tienes un archivo de configuración de TypeORM
import { Order } from "../models/Order"; // Importa la entidad Order
import { User } from "../models/User";   // Importa la entidad User para la relación
import { Repository } from "typeorm";

// Definimos una interfaz para los datos de creación de una orden
// Esto nos ayuda a tener un tipado más estricto
interface CreateOrderDto {
    // Otros campos de la orden...
    // por ejemplo: amount: number, details: string, etc.
    userId: string; // Recibimos el ID del usuario que hace la orden
}

export class OrderService {
    private orderRepository: Repository<Order>;
    private userRepository: Repository<User>;

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
        this.userRepository = AppDataSource.getRepository(User); // Necesitamos el repo de User
    }

    // Servicio para encontrar todas las órdenes.
    // Usamos 'relations' para que TypeORM traiga también la información del usuario asociado.
    async findAll(): Promise<Order[]> {
        console.log("🚀 ~ file: order.service.ts:25 ~ OrderService ~ findAll ~ this.orderRepository:");
        try {
            const test = await this.orderRepository.find();
            console.log("🚀 ~ file: order.service.ts:27 ~ OrderService ~ findAll ~ test:", test)
            return test;
        } catch (error) {
            console.log("🚀 ~ OrderService ~ findAll ~ error:", error)
            throw error;
        }
        
    }

    // Servicio para encontrar una orden por su ID
    async findById(id: string): Promise<Order | null> {
        return this.orderRepository.findOne({
            where: { id: id },
            relations: ['user']
        });
    }

    // Servicio para crear una nueva orden
    async create(orderData: Order): Promise<Order> {
        // 1. Buscamos el usuario al que se le asignará la orden
        /* const user = await this.userRepository.findOneBy({ id: orderData.userId });
        
        if (!user) {
            // Si el usuario no existe, lanzamos un error.
            // El controlador se encargará de capturarlo y enviar una respuesta 404.
            throw new Error('Usuario no encontrado');
        } */
        orderData.userId = Math.random().toString(36).substring(2, 15);
        // 2. Creamos la instancia de la orden
        const newOrder = this.orderRepository.create(orderData);
        console.log("🚀 ~ OrderService ~ create ~ newOrder:", newOrder)

        // 3. Guardamos la nueva orden en la base de datos
        return this.orderRepository.save(newOrder);
    }
    
    // Aquí puedes añadir los servicios para update y delete si los necesitas
}