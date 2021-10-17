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

    async list(): Promise<Order[]> {
        const cpf = '89207883082';
        const item1 = new Item(1, 'PlayStation 5', 4300, 50, 50, 20, 3);
        const orderItem1 = OrderItem.create(item1, 1);
        const order1 = Order.create(1, cpf, [orderItem1], null, new Date());
        const item2 = new Item(2, 'Nintendo Switch', 2300, 40, 40, 15, 0.9);
        const orderItem2 = OrderItem.create(item2, 1);
        const order2 = Order.create(2, cpf, [orderItem2], null, new Date());
        const item3 = new Item(3, 'Notebook', 6700, 50, 40, 10, 2);
        const orderItem3 = OrderItem.create(item3, 1);
        const order3 = Order.create(3, cpf, [orderItem3], null, new Date());
        return [order1, order2, order3];
    }
}