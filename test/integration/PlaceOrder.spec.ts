import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';

describe('Place Order tests', () => {
    test('it should be able to place an order', () => {
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
        const output = placeOrder.execute(input);
        expect(output.total).toBe(15668);
    });
});