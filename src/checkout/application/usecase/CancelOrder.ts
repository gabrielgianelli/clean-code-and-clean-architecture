import OrderRepository from '../../domain/repository/OrderRepository';
import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import EventBus from '../../../shared/infra/event/EventBus';
import OrderCancelled from '../../../shared/domain/event/OrderCancelled';

export default class CancelOrder {
    private orderRepository: OrderRepository;

    constructor(
        readonly abstractRepositoryFactory: AbstractRepositoryFactory,
        readonly eventBus: EventBus
    ) {
        this.orderRepository = abstractRepositoryFactory.createOrderRepository();
    }

    async execute(orderCode: string): Promise<void> {
        const order = await this.orderRepository.findByCode(orderCode);
        order.cancel(new Date());
        await this.orderRepository.save(order);
        await this.eventBus.publish(new OrderCancelled(
            order.code.value,
            order.items.map(item => ({
                idItem: item.id,
                quantity: item.quantity
            }))
        ));
    }
}