import { AppDataSource } from "../config/database"; // Asumiendo que tienes un archivo de configuración de TypeORM
import { User } from "../models/User"; // Importa tu entidad
import { Repository } from "typeorm";

// Generalmente se usa una clase para encapsular la lógica y el repositorio
export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    // Obtenemos el repositorio de la entidad User
    this.userRepository = AppDataSource.getRepository(User);
  }

  // Servicio para encontrar todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Servicio para encontrar un usuario por ID
  async findById(id: string): Promise<User | null> {
    // findOneBy es más moderno y seguro que findOne(id)
    const user = await this.userRepository.findOneBy({ id: id });
    return user;
  }

  // Servicio para crear un nuevo usuario
  async create(userData: Partial<User>): Promise<User> {
    // Creamos una nueva instancia de la entidad
    const newUser = this.userRepository.create(userData);
    // Guardamos la entidad en la base de datos
    return this.userRepository.save(newUser);
  }

  // Servicio para actualizar un usuario
  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null; // O lanzar un error
    }
    // Mezcla los datos existentes con los nuevos
    this.userRepository.merge(user, userData);
    return this.userRepository.save(user);
  }

  // Servicio para eliminar un usuario
  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    // delete devuelve un objeto DeleteResult, verificamos si algo fue afectado
    return result.affected !== 0;
  }
}
