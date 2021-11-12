import PlaceOrder from '../../src/checkout/application/usecase/PlaceOrder';
import DatabaseConnectionAdapter from '../../src/shared/infra/database/DatabaseConnectionAdapter';
import PlaceOrderInput from '../../src/checkout/application/dto/PlaceOrderInput';
import DatabaseRepositoryFactory from '../../src/checkout/infra/factory/DatabaseRepositoryFactory';
import MemoryRepositoryFactory from '../../src/checkout/infra/factory/MemoryRepositoryFactory';

describe('Place Order tests', () => {
    let input: PlaceOrderInput;

    beforeEach(() => {
        input = new PlaceOrderInput('89207883082', [
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
        ],
        'VALE10');
    });
    
    test('it should be able to place an order', async () => {
        const placeOrderMemory = new PlaceOrder(new MemoryRepositoryFactory());
        const output = await placeOrderMemory.execute(input);
        expect(output.total).toBe(14101.2);
    });
    
    test('it should be able to place an order using items in database', async () => {
        const placeOrderDatabase = new PlaceOrder(new DatabaseRepositoryFactory(new DatabaseConnectionAdapter()));
        const output = await placeOrderDatabase.execute(input);
        expect(output.total).toBe(14101.2);
    });
});