import GetOrder from '../../src/application/query/GetOrder';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import OrderDAOMemory from '../../src/infra/dao/memory/OrderDAOMemory';
import OrderDAODatabase from '../../src/infra/dao/database/OrderDAODatabase';

describe('Find Order tests', () => {
    test('it should be able to find an order by order code in memory', async () => {
        const input = '202100000001';
        const findOrder = new GetOrder(new OrderDAOMemory());
        const output = await findOrder.execute(input);
        expect(output.total).toBe(4330);
    });

    test('it should be able to find an order by order code in database', async () => {
        const input = '202100000001';
        const findOrder = new GetOrder(new OrderDAODatabase(new DatabaseConnectionAdapter()));
        const output = await findOrder.execute(input);
        expect(output.total).toBe(4330);
    });
});