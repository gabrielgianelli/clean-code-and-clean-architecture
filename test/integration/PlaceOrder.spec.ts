import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';

describe('Place Order tests', () => {
    test('it should be able to place an order', async () => {
        const input = {
            cpf: '89207883082',
            orderItems: [
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
        const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new OrderRepositoryMemory());
        const output = await placeOrder.execute(input);
        expect(output.total).toBe(15668);
    });

    test('it should be able to place an order using items in database', async () => {
        const input = {
            cpf: '89207883082',
            orderItems: [
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
        const placeOrder = new PlaceOrder(new ItemRepositoryDatabase(new DatabaseConnectionAdapter()), new OrderRepositoryMemory());
        const output = await placeOrder.execute(input);
        expect(output.total).toBe(15668);
    });
});