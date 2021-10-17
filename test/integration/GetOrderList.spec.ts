import GetOrderList from "../../src/application/usecase/GetOrderList";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

describe('Get Order List tests', () => {
    test('it should get the order list from memory', async () => {
        const getOrderList = new GetOrderList(new OrderRepositoryMemory());
        const output = await getOrderList.execute();
        expect(output.orders.length).toBe(3);
    });
});