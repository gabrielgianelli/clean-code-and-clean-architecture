import SimulateShipping from '../../src/application/usecase/SimulateShipping';
import MemoryRepositoryFactory from '../../src/infra/factory/MemoryRepositoryFactory';

describe('Simulate Shipping tests', () => {
    test('it should be able to simulate a shipping cost', async () => {
        const input = {
            items: [
                {
                    idItem: 1,
                    quantity: 1
                },
                {
                    idItem: 2,
                    quantity: 2
                },
                {
                    idItem: 3,
                    quantity: 1
                }
            ]
        };
        const simulateShipping = new SimulateShipping(new MemoryRepositoryFactory());
        const output = await simulateShipping.execute(input);
        expect(output.cost).toBe(68);
    });
});