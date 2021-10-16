import FindOrder from '../../src/application/usecase/FindOrder';
import FindOrderInput from '../../src/application/dto/FindOrderInput';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';

describe('Find Order tests', () => {
    test('it should be able to find an order by order code in memory', async () => {
        const input = new FindOrderInput('202100000001');
        const findOrder = new FindOrder(new OrderRepositoryMemory());
        const output = await findOrder.execute(input);
        expect(output.total).toBe(4330);
    });

    test('it should be able to find an order by order code in database', async () => {
        const input = new FindOrderInput('202100000001');
        const findOrder = new FindOrder(new OrderRepositoryDatabase(new DatabaseConnectionAdapter()));
        const output = await findOrder.execute(input);
        expect(output.total).toBe(4330);
    });
});