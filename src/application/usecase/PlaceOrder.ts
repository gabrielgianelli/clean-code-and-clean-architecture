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

    async execute(placeOrderInput: PlaceOrderInput): Promise<PlaceOrderOutput>{
        const {cpf, orderItems: inputItems} = placeOrderInput;
        const orderItems = await Promise.all(inputItems.map(async (orderItem) => {
            const item = await this.itemRepository.findById(orderItem.idItem);
            return OrderItem.create(item, orderItem.quantity);
        }));
        const order = Order.create(this.orderRepository.sequence, cpf, orderItems);
        if (!order) throw new Error('Order cannot be placed.');
        this.orderRepository.save(order);
        return {
            total: order.total
        };
    }
}