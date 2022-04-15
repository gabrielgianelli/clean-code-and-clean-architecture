import OrderController from '../../../checkout/infra/controllers/OrderController';
import SimulateShippingController from '../../../checkout/infra/controllers/SimulateShippingController';
import ValidateVoucherController from '../../../checkout/infra/controllers/ValidateVoucherController';
import OrderDAODatabase from '../../../checkout/infra/dao/database/OrderDAODatabase';
import DatabaseRepositoryFactory from '../../../checkout/infra/factory/DatabaseRepositoryFactory';
import StockRepositoryDatabase from '../../../stock/infra/repository/StockRepositoryDatabase';
import EventBus from '../event/EventBus';
import Http from './Http';

export default class Router {
    constructor(
        readonly http: Http,
        readonly databaseRepositoryFactory: DatabaseRepositoryFactory,
        readonly orderDaoDatabase: OrderDAODatabase,
        readonly stockRepositoryDatabase: StockRepositoryDatabase,
        readonly eventBus: EventBus
    ) {
        this.configure();
    }

    configure() {
        this.http.on('/order', 'post', async (params: any, body: any) => {
            const orderController = new OrderController(
                    this.databaseRepositoryFactory, 
                    this.orderDaoDatabase,
                    this.stockRepositoryDatabase, 
                    this.eventBus
            );
            return orderController.create(params, body);
        });

        this.http.on('/order', 'get', async (params: any, body: any) => {
            const orderController = new OrderController(
                this.databaseRepositoryFactory, 
                this.orderDaoDatabase,
                this.stockRepositoryDatabase, 
                this.eventBus
            );
            return orderController.index(params, body);
        });

        this.http.on('/order/:order_code', 'get', async (params: any, body: any) => {
            const orderController = new OrderController(
                this.databaseRepositoryFactory, 
                this.orderDaoDatabase,
                this.stockRepositoryDatabase, 
                this.eventBus
            );
            return orderController.show(params, body);
        });

        this.http.on('/simulate_shipping', 'post', async (params: any, body: any) => {
            const simulateShippingController = new SimulateShippingController(this.databaseRepositoryFactory);
            return simulateShippingController.create(params, body);
        });

        this.http.on('/validate_voucher', 'post', async (params: any, body: any) => {
            const validateVoucherController = new ValidateVoucherController(this.databaseRepositoryFactory);
            return validateVoucherController.create(params, body);
        });
    }
}
