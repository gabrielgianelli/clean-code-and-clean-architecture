import PlaceOrder from '../../application/usecase/PlaceOrder';
import GetOrder from '../../application/query/GetOrder';
import GetOrders from '../../application/query/GetOrders';
import EventBus from '../../../shared/infra/event/EventBus';
import OrderPlacedStockHandler from '../../../stock/domain/handler/OrderPlacedStockHandler';
import CancelOrder from '../../application/usecase/CancelOrder';
import OrderCancelledStockHandler from '../../../stock/domain/handler/OrderCancelledStockHandler';
import AbstractRepositoryFactory from '../../domain/factory/AbstractRepositoryFactory';
import OrderDAO from '../../application/query/OrderDAO';
import StockRepository from '../../../stock/domain/repository/StockRepository';

export default class OrderController {
    constructor(
        readonly abstractRepositoryFactory: AbstractRepositoryFactory,
        readonly orderDAO: OrderDAO,
        readonly stockRepository: StockRepository,
        readonly eventBus: EventBus
    ) {}

    async create(params: any, body: any) {
        this.eventBus.subscribe(
            'OrderPlaced', 
            new OrderPlacedStockHandler(this.stockRepository)
        );
        const placeOrder = new PlaceOrder(
            this.abstractRepositoryFactory,
            this.eventBus
        );
        const { cpf, orderItems, voucherName } = body;
        return await placeOrder.execute({ cpf, orderItems, voucherName });
    }

    async update(params: any, body: any) {
        this.eventBus.subscribe(
            'OrderCancelled',
            new OrderCancelledStockHandler(this.stockRepository)
        );
        const cancelOrder = new CancelOrder(
            this.abstractRepositoryFactory,
            this.eventBus
        );
        const { order_code } = params;
        await cancelOrder.execute(order_code);
    }

    async index(params: any, body: any) {
        const getOrders = new GetOrders(this.orderDAO);
        return await getOrders.execute();
    }

    async show(params: any, body: any) {
        const { order_code } = params;
        const findOrder = new GetOrder(this.orderDAO);
        return await findOrder.execute(order_code);
    }
}