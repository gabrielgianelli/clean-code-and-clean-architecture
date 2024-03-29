import Order from '../../domain/entity/Order';
import OrderItem from "../../domain/entity/OrderItem";
import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import VoucherRepository from '../../domain/repository/VoucherRepository';
import ShippingCalculator from '../../domain/service/ShippingCalculator';
import ShippingCalculatorInput from '../../domain/dto/ShippingCalculatorInput';
import PlaceOrderInput from "../dto/PlaceOrderInput";
import PlaceOrderOutput from "../dto/PlaceOrderOutput";
import EventBus from '../../../shared/infra/event/EventBus';
import OrderPlaced from '../../../shared/domain/event/OrderPlaced';

export default class PlaceOrder {
    orderRepository: OrderRepository
    itemRepository: ItemRepository;
    voucherRepository: VoucherRepository;

    constructor(
        readonly abstractRepositoryFactory: AbstractRepositoryFactory,
        readonly eventBus: EventBus
    ){
        this.orderRepository = abstractRepositoryFactory.createOrderRepository();
        this.itemRepository = abstractRepositoryFactory.createItemRepository();
        this.voucherRepository = abstractRepositoryFactory.createVoucherRepository();
    }

    async execute(placeOrderInput: PlaceOrderInput): Promise<PlaceOrderOutput>{
        const { cpf, orderItems: inputItems, voucherName } = placeOrderInput;
        const orderItems = await this.orderItems(inputItems);
        const shippingItems = orderItems.map(item => new ShippingCalculatorInput(item, item.quantity));
        const shippingCost = ShippingCalculator.execute(shippingItems);
        const voucher = voucherName ? await this.voucherRepository.findByName(voucherName) : null;
        const sequence = await this.orderRepository.sequence();
        const order = Order.create(sequence, cpf, orderItems, shippingCost, voucher);
        if (!order) throw new Error('Order cannot be placed.');
        await this.orderRepository.save(order);
        await this.eventBus.publish(new OrderPlaced(
            order.code.value, 
            order.items.map(item => {
                return {
                    idItem: item.id,
                    quantity: item.quantity
                }
            })
        ));
        return {
            code: order.code.value,
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