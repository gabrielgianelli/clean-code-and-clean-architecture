import FindOrder from '../../src/application/usecase/FindOrder';
import FindOrderInput from '../../src/application/dto/FindOrderInput';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';

describe('Find Order tests', () => {
    test('it should be able to find an order with order code in memory', async () => {
        const input = new FindOrderInput('202100000001');
        const findOrder = new FindOrder(new OrderRepositoryMemory());
        const output = await findOrder.execute(input);
        expect(output.total).toBe(4330);
    });
});