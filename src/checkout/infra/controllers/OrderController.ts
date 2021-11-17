import { Request, Response } from 'express';


import PlaceOrder from '../../application/usecase/PlaceOrder';
import DatabaseConnectionAdapter from '../../../shared/infra/database/DatabaseConnectionAdapter';
import DatabaseRepositoryFactory from '../factory/DatabaseRepositoryFactory';
import OrderDAODatabase from '../dao/database/OrderDAODatabase';
import GetOrder from '../../application/query/GetOrder';
import GetOrders from '../../application/query/GetOrders';
import EventBus from '../../../shared/infra/event/EventBus';
import OrderPlacedStockHandler from '../../../stock/domain/handler/OrderPlacedStockHandler';
import StockRepositoryDatabase from '../../../stock/infra/repository/StockRepositoryDatabase';

export default class OrderController {
    async create(request: Request, response: Response): Promise<Response> {
        const { cpf, orderItems, voucherName } = request.body;
        const eventBus = new EventBus();
        const databaseConnectionAdapter = new DatabaseConnectionAdapter();
        eventBus.subscribe('OrderPlaced', new OrderPlacedStockHandler(new StockRepositoryDatabase(databaseConnectionAdapter)));
        const placeOrder = new PlaceOrder(
            new DatabaseRepositoryFactory(databaseConnectionAdapter),
            eventBus
        );
        const output = await placeOrder.execute({cpf, orderItems, voucherName});
        return response.json(output);
    }

    async index(request: Request, response: Response): Promise<Response> {
        const getOrders = new GetOrders(
            new OrderDAODatabase(new DatabaseConnectionAdapter())
        );
        const orders = await getOrders.execute();
        return response.json(orders);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { order_code } = request.params;
        const findOrder = new GetOrder(
            new OrderDAODatabase(new DatabaseConnectionAdapter())
        );
        const order = await findOrder.execute(order_code);
        return response.json(order);
    }
}