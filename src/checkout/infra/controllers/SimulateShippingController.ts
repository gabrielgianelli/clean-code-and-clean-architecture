import { Request, Response } from 'express';
import SimulateShipping from '../../application/usecase/SimulateShipping';
import DatabaseConnectionAdapter from "../../../shared/infra/database/DatabaseConnectionAdapter";
import DatabaseRepositoryFactory from '../factory/DatabaseRepositoryFactory';

export default class SimulateShippingController {
    async create(request: Request, response: Response): Promise<Response> {
        const { items } = request.body;
        const simulateShipping = new SimulateShipping(
            new DatabaseRepositoryFactory(new DatabaseConnectionAdapter())
        );
        const output = await simulateShipping.execute({ items });
        return response.json(output);
    }
}