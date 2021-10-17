import { Request, Response } from 'express';
import SimulateShipping from '../../application/usecase/SimulateShipping';
import DatabaseConnectionAdapter from '../database/DatabaseConnectionAdapter';
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase';

export default class SimulateShippingController {
    async create(request: Request, response: Response): Promise<Response> {
        const { items } = request.body;
        const simulateShipping = new SimulateShipping(
            new ItemRepositoryDatabase(new DatabaseConnectionAdapter())
        );
        const output = await simulateShipping.execute({ items });
        return response.json(output);
    }
}