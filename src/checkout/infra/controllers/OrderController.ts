import PlaceOrder from '../../application/usecase/PlaceOrder';
import DatabaseRepositoryFactory from '../factory/DatabaseRepositoryFactory';
import OrderDAODatabase from '../dao/database/OrderDAODatabase';
import GetOrder from '../../application/query/GetOrder';
import GetOrders from '../../application/query/GetOrders';
import EventBus from '../../../shared/infra/event/EventBus';
import OrderPlacedStockHandler from '../../../stock/domain/handler/OrderPlacedStockHandler';
import StockRepositoryDatabase from '../../../stock/infra/repository/StockRepositoryDatabase';
import CancelOrder from '../../application/usecase/CancelOrder';
import OrderCancelledStockHandler from '../../../stock/domain/handler/OrderCancelledStockHandler';

export default class OrderController {
    constructor(
        readonly databaseRepositoryFactory: DatabaseRepositoryFactory,
        readonly orderDaoDatabase: OrderDAODatabase,
        readonly stockRepositoryDatabase: StockRepositoryDatabase,
        readonly eventBus: EventBus
    ) {}

    async create(params: any, body: any) {
        this.eventBus.subscribe(
            'OrderPlaced', 
            new OrderPlacedStockHandler(this.stockRepositoryDatabase)
        );
        const placeOrder = new PlaceOrder(
            this.databaseRepositoryFactory,
            this.eventBus
        );
        const { cpf, orderItems, voucherName } = body;
        return await placeOrder.execute({ cpf, orderItems, voucherName });
    }

    async update(params: any, body: any) {
        this.eventBus.subscribe(
            'OrderCancelled',
            new OrderCancelledStockHandler(this.stockRepositoryDatabase)
        );
        const cancelOrder = new CancelOrder(
            this.databaseRepositoryFactory,
            this.eventBus
        );
        const { order_code } = params;
        await cancelOrder.execute(order_code);
    }

    async index(params: any, body: any) {
        const getOrders = new GetOrders(this.orderDaoDatabase);
        return await getOrders.execute();
    }

    async show(params: any, body: any) {
        const { order_code } = params;
        const findOrder = new GetOrder(this.orderDaoDatabase);
        return await findOrder.execute(order_code);
    }
}