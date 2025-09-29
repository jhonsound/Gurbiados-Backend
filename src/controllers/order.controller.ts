import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await this.orderService.findAll();
      console.log("🚀 ~ OrderController ~ orders:", orders);
      res.status(200).json(orders);
    } catch (error) {
      res.status(401).json({ message: "Error al obtener las órdenes", error });
    }
  };

  public getOrderById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const order = await this.orderService.findById(id);

      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la orden", error });
    }
  };

  public createOrder = async (req: Request, res: Response) => {
    try {
      const newOrder = await this.orderService.create(req.body, res);
      res.status(201).json(newOrder);
    } catch (error) {
      console.log("🚀 ~ OrderController ~ error:", error);
      if (error instanceof Error && error.message === "Usuario no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      res
        .status(400)
        .json({
          message: (error as any).detail,
          error: (error as any).detail,
        });
    }
  };
}

// Exportamos una instancia
export default new OrderController();
