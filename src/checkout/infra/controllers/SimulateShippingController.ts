import SimulateShipping from '../../application/usecase/SimulateShipping';
import DatabaseRepositoryFactory from '../factory/DatabaseRepositoryFactory';

export default class SimulateShippingController {
    constructor(readonly databaseRepositoryFactory: DatabaseRepositoryFactory) {}

    async create(params: any, body: any) {
        const { items } = body;
        const simulateShipping = new SimulateShipping(this.databaseRepositoryFactory);
        return await simulateShipping.execute({ items });
    }
}