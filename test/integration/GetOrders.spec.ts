import GetOrders from "../../src/checkout/application/query/GetOrders";
import DatabaseConnectionAdapter from '../../src/shared/infra/database/DatabaseConnectionAdapter';
import OrderDAOMemory from "../../src/checkout/infra/dao/memory/OrderDAOMemory";
import OrderDAODatabase from "../../src/checkout/infra/dao/database/OrderDAODatabase";

describe('Get Order List tests', () => {
    test('it should get the order list from memory', async () => {
        const getOrders = new GetOrders(new OrderDAOMemory());
        const output = await getOrders.execute();
        expect(output.length).toBe(3);
    });

    test('it should get the order list from database', async () => {
        const getOrders = new GetOrders(new OrderDAODatabase(new DatabaseConnectionAdapter()));
        const output = await getOrders.execute();
        expect(output.length).toBeGreaterThanOrEqual(1);
    });
});