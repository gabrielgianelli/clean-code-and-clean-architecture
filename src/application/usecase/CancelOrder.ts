import OrderRepository from '../../domain/repository/OrderRepository';
import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";

export default class CancelOrder {
    private orderRepository: OrderRepository;

    constructor(readonly abstractRepositoryFactory: AbstractRepositoryFactory) {
        this.orderRepository = abstractRepositoryFactory.createOrderRepository();
    }

    async execute(orderCode: string): Promise<void> {
        const order = await this.orderRepository.findByCode(orderCode);
        order.cancel(new Date());
        await this.orderRepository.save(order);
    }
}