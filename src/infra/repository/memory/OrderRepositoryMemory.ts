import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    private orders: Order[];
    
    constructor(){
        this.orders = [];
    }
    
    async save(order: Order): Promise<void> {
        const existingOrder = this.orders.find(existingOrder => existingOrder.code.value === order.code.value);
        if (existingOrder) this.orders.map(savedOrder => {
            if (savedOrder.code.value === order.code.value) return order;
            return savedOrder;
        });
        else this.orders.push(order);
    }

    async sequence(): Promise<number> {
        return 1;
    }

    async findByCode(code: string): Promise<Order> {
        const order = this.orders.find(savedOrder => savedOrder.code.value === code);
        if (!order) throw new Error('Order not found.');
        return order;
    }
}