import Order from './Order';
import OrderItem from "./OrderItem";
import ItemRepository from "./ItemRepository";
import OrderRepository from "./OrderRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder {
    constructor(
        readonly itemRepository: ItemRepository, 
        readonly orderRepository: OrderRepository
    ){}

    execute(placeOrderInput: PlaceOrderInput): PlaceOrderOutput{
        const orderItems = placeOrderInput.orderItems.map(orderItem => {
            const item = this.itemRepository.findById(orderItem.idItem);
            return OrderItem.create(item, orderItem.quantity);
        });
        const order = Order.create(placeOrderInput.cpf, orderItems);
        if (!order) throw new Error('Order cannot be placed.');
        this.orderRepository.save(order);
        return {
            total: order.total
        };
    }
}