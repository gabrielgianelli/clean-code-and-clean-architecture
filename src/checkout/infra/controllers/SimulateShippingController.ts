import SimulateShipping from '../../application/usecase/SimulateShipping';
import AbstractRepositoryFactory from '../../domain/factory/AbstractRepositoryFactory';

export default class SimulateShippingController {
    constructor(readonly abstractRepositoryFactory: AbstractRepositoryFactory) {}

    async create(params: any, body: any) {
        const { items } = body;
        const simulateShipping = new SimulateShipping(this.abstractRepositoryFactory);
        return await simulateShipping.execute({ items });
    }
}