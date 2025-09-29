import { log } from "node:console";
import { AppDataSource } from "../config/database"; // Asumiendo que tienes un archivo de configuración de TypeORM
import { Order } from "../models/Order"; // Importa la entidad Order
import { User } from "../models/User"; // Importa la entidad User para la relación
import { Repository } from "typeorm";
import { Response } from "express";

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
    console.log(
      "🚀 ~ file: order.service.ts:25 ~ OrderService ~ findAll ~ this.orderRepository:"
    );
    try {
      const test = await this.orderRepository.find();
      console.log(
        "🚀 ~ file: order.service.ts:27 ~ OrderService ~ findAll ~ test:",
        test
      );
      return test;
    } catch (error) {
      console.log("🚀 ~ OrderService ~ findAll ~ error:", error);
      throw error;
    }
  }

  // Servicio para encontrar una orden por su ID
  async findById(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id: id },
      relations: ["user"],
    });
  }

  async create(orderData: Order, res: Response) : Promise<Order> {
    try {
      const order = await this.orderRepository.findOneBy({
        email: orderData.email,
      });
      
      if (order) {
          res.status(404).json({ message: "Ya existe una orden con ese email." });
      }
      orderData.userId = Math.random().toString(36).substring(2, 15);
      const newOrder = this.orderRepository.create(orderData);
      console.log("🚀 ~ OrderService ~ create ~ newOrder:", newOrder);

      return this.orderRepository.save(newOrder);
    } catch (error) {
      console.log("🚀 ~ OrderService ~ create ~ error:", error);
      throw error;
    }
  }
}
