import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import PlaceOrderInput from '../../src/application/dto/PlaceOrderInput';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';
import MemoryRepositoryFactory from '../../src/infra/factory/MemoryRepositoryFactory';

describe('Place Order tests', () => {
    let input: PlaceOrderInput;
    let placeOrderMemory: PlaceOrder;
    let placeOrderDatabase: PlaceOrder;

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
        placeOrderMemory = new PlaceOrder(new MemoryRepositoryFactory());
        placeOrderDatabase = new PlaceOrder(new DatabaseRepositoryFactory(new DatabaseConnectionAdapter()));
    });

    test('it should be able to place an order', async () => {
        const output = await placeOrderMemory.execute(input);
        expect(output.total).toBe(14101.2);
    });

    test('it should be able to place an order using items in database', async () => {
        const output = await placeOrderDatabase.execute(input);
        expect(output.total).toBe(14101.2);
    });
});