import GetOrderList from "../../src/application/usecase/GetOrderList";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';

describe('Get Order List tests', () => {
    test('it should get the order list from memory', async () => {
        const getOrderList = new GetOrderList(new OrderRepositoryMemory());
        const output = await getOrderList.execute();
        expect(output.orders.length).toBe(3);
    });

    test('it should get the order list from database', async () => {
        const getOrderList = new GetOrderList(new OrderRepositoryDatabase(new DatabaseConnectionAdapter()));
        const output = await getOrderList.execute();
        expect(output.orders.length).toBeGreaterThanOrEqual(1);
    });
});