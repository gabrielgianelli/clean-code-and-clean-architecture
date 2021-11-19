
import ExpressAdapter from './shared/infra/http/ExpressAdapter';
import DatabaseConnectionAdapter from './shared/infra/database/DatabaseConnectionAdapter';
import DatabaseRepositoryFactory from './checkout/infra/factory/DatabaseRepositoryFactory';
import OrderDAODatabase from './checkout/infra/dao/database/OrderDAODatabase';
import StockRepositoryDatabase from './stock/infra/repository/StockRepositoryDatabase';
import EventBus from './shared/infra/event/EventBus';
import Router from './shared/infra/http/Router';

class Server {
    constructor() {
        const http = new ExpressAdapter();
        const databaseConnection = new DatabaseConnectionAdapter();
        const databaseRepositoryFactory = new DatabaseRepositoryFactory(databaseConnection);
        const orderDAODatabase = new OrderDAODatabase(databaseConnection);
        const stockRepositoryDatabase = new StockRepositoryDatabase(databaseConnection);
        const eventBus = new EventBus();
        const router = new Router(http, databaseRepositoryFactory, orderDAODatabase, stockRepositoryDatabase, eventBus);
        http.listen(3333);
    }
}

export default new Server();