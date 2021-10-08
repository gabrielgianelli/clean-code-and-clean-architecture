import Order from '../../domain/entity/Order';
import OrderItem from "../../domain/entity/OrderItem";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import PlaceOrderInput from "../dto/PlaceOrderInput";
import PlaceOrderOutput from "../dto/PlaceOrderOutput";

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