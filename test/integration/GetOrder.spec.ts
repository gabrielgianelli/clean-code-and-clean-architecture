import GetOrder from '../../src/checkout/application/query/GetOrder';
import DatabaseConnectionAdapter from '../../src/shared/infra/database/DatabaseConnectionAdapter';
import OrderDAOMemory from '../../src/checkout/infra/dao/memory/OrderDAOMemory';
import OrderDAODatabase from '../../src/checkout/infra/dao/database/OrderDAODatabase';

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