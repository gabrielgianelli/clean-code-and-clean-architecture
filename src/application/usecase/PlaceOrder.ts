import Order from '../../domain/entity/Order';
import OrderItem from "../../domain/entity/OrderItem";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import VoucherRepository from '../../domain/repository/VoucherRepository';
import PlaceOrderInput from "../dto/PlaceOrderInput";
import PlaceOrderOutput from "../dto/PlaceOrderOutput";

export default class PlaceOrder {
    constructor(
        readonly itemRepository: ItemRepository, 
        readonly orderRepository: OrderRepository,
        readonly voucherRepository: VoucherRepository
    ){}

    async execute(placeOrderInput: PlaceOrderInput): Promise<PlaceOrderOutput>{
        const { cpf, orderItems: inputItems, voucherName } = placeOrderInput;
        const orderItems = await this.orderItems(inputItems);
        const voucher = voucherName ? await this.voucherRepository.findByName(voucherName) : null;
        const sequence = await this.orderRepository.sequence();
        const order = Order.create(sequence, cpf, orderItems, voucher);
        if (!order) throw new Error('Order cannot be placed.');
        await this.orderRepository.save(order);
        return {
            total: order.total
        };
    }

    private async orderItems(inputItems: any): Promise<OrderItem[]>{
        return await Promise.all(inputItems.map(async (orderItem: any) => {
            const item = await this.itemRepository.findById(orderItem.idItem);
            return OrderItem.create(item, orderItem.quantity);
        }));
    }
}