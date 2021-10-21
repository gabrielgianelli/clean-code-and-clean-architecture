import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderItem from "../../../domain/entity/OrderItem";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];
    
    constructor(){
        this.orders = [];
    }

    async save(order: Order): Promise<void> {
        this.orders.push(order);
    }

    async sequence(): Promise<number> {
        return 1;
    }
}