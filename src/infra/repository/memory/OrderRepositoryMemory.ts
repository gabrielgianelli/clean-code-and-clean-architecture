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

    async findByCode(orderCode: string): Promise<Order | null> {
        const item = new Item(1, 'PlayStation 5', 4300, 50, 50, 20, 3);
        const orderItem = OrderItem.create(item, 1);
        return Order.create(1, '89207883082', [orderItem]);
    }
}