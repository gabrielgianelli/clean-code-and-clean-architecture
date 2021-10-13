import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import PlaceOrderInput from '../../src/application/dto/PlaceOrderInput';
import VoucherRepositoryMemory from '../../src/infra/repository/memory/VoucherRepositoryMemory';

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
    });

    test('it should be able to place an order', async () => {
        const placeOrder = new PlaceOrder(
            new ItemRepositoryMemory(), 
            new OrderRepositoryMemory(), 
            new VoucherRepositoryMemory()
        );
        const output = await placeOrder.execute(input);
        expect(output.total).toBe(14101.2);
    });

    test('it should be able to place an order using items in database', async () => {
        const placeOrder = new PlaceOrder(
            new ItemRepositoryDatabase(new DatabaseConnectionAdapter()), 
            new OrderRepositoryMemory(),
            new VoucherRepositoryMemory()
        );
        const output = await placeOrder.execute(input);
        expect(output.total).toBe(14101.2);
    });
});