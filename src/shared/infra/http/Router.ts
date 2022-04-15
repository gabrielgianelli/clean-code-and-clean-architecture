import ItemDAO from '../../../catalog/application/query/ItemDAO';
import ItemsController from '../../../catalog/infra/controller/ItemsController';
import OrderDAO from '../../../checkout/application/query/OrderDAO';
import AbstractRepositoryFactory from '../../../checkout/domain/factory/AbstractRepositoryFactory';
import OrderController from '../../../checkout/infra/controllers/OrderController';
import SimulateShippingController from '../../../checkout/infra/controllers/SimulateShippingController';
import ValidateVoucherController from '../../../checkout/infra/controllers/ValidateVoucherController';
import StockRepository from '../../../stock/domain/repository/StockRepository';
import EventBus from '../event/EventBus';
import Http from './Http';

export default class Router {
    constructor(
        readonly http: Http,
        readonly abstractRepositoryFactory: AbstractRepositoryFactory,
        readonly orderDAO: OrderDAO,
        readonly stockRepository: StockRepository,
        readonly itemDAO: ItemDAO,
        readonly eventBus: EventBus
    ) {
        this.configure();
    }

    configure() {
        this.http.on('/order', 'post', async (params: any, body: any) => {
            const orderController = new OrderController(
                    this.abstractRepositoryFactory, 
                    this.orderDAO,
                    this.stockRepository, 
                    this.eventBus
            );
            return orderController.create(params, body);
        });

        this.http.on('/order/:order_code', 'put', async (params: any, body: any) => {
            const orderController = new OrderController(
                    this.abstractRepositoryFactory, 
                    this.orderDAO,
                    this.stockRepository, 
                    this.eventBus
            );
            return orderController.update(params, body);
        });

        this.http.on('/order', 'get', async (params: any, body: any) => {
            const orderController = new OrderController(
                this.abstractRepositoryFactory, 
                this.orderDAO,
                this.stockRepository, 
                this.eventBus
            );
            return orderController.index(params, body);
        });

        this.http.on('/order/:order_code', 'get', async (params: any, body: any) => {
            const orderController = new OrderController(
                this.abstractRepositoryFactory, 
                this.orderDAO,
                this.stockRepository, 
                this.eventBus
            );
            return orderController.show(params, body);
        });

        this.http.on('/simulate_shipping', 'post', async (params: any, body: any) => {
            const simulateShippingController = new SimulateShippingController(this.abstractRepositoryFactory);
            return simulateShippingController.create(params, body);
        });

        this.http.on('/validate_voucher', 'post', async (params: any, body: any) => {
            const validateVoucherController = new ValidateVoucherController(this.abstractRepositoryFactory);
            return validateVoucherController.create(params, body);
        });

        this.http.on('/items', 'get', async (params: any, body: any) => {
            const itemsController = new ItemsController(this.itemDAO);
            return itemsController.index(params, body);
        })
    }
}
