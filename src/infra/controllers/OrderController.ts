import { Request, Response } from 'express';
import FindOrder from '../../application/usecase/FindOrder';
import GetOrderList from '../../application/usecase/GetOrderList';
import PlaceOrder from '../../application/usecase/PlaceOrder';
import DatabaseConnectionAdapter from '../database/DatabaseConnectionAdapter';
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../repository/database/OrderRepositoryDatabase';
import VoucherRepositoryDatabase from '../repository/database/VoucherRepositoryDatabase';

export default class OrderController {
    async create(request: Request, response: Response): Promise<Response> {
        const { cpf, orderItems, voucherName } = request.body;
        const placeOrder = new PlaceOrder(
            new ItemRepositoryDatabase(new DatabaseConnectionAdapter()),
            new OrderRepositoryDatabase(new DatabaseConnectionAdapter()),
            new VoucherRepositoryDatabase(new DatabaseConnectionAdapter())
        );
        const output = await placeOrder.execute({cpf, orderItems, voucherName});
        return response.json(output);
    }

    async index(request: Request, response: Response): Promise<Response> {
        const getOrderList = new GetOrderList(
            new OrderRepositoryDatabase(new DatabaseConnectionAdapter())
        );
        const orders = await getOrderList.execute();
        return response.json(orders);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { order_code } = request.params;
        const findOrder = new FindOrder(
            new OrderRepositoryDatabase(new DatabaseConnectionAdapter())
        );
        const order = await findOrder.execute({ orderCode: order_code });
        return response.json(order);
    }
}