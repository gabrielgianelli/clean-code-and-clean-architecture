import PlaceOrderInput from "../../src/application/dto/PlaceOrderInput";
import CancelOrder from "../../src/application/usecase/CancelOrder";
import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import Item from "../../src/domain/entity/Item";
import Order from "../../src/domain/entity/Order";
import OrderItem from "../../src/domain/entity/OrderItem";
import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

describe('Cancel Order tests', () => {
    let order: Order;
    
    beforeEach(() => {
        const orderItems = [
            OrderItem.create(new Item(1, 'PlayStation 5', 4300, 50, 50, 20, 3), 1)
        ];
        order = Order.create(1, '89207883082', orderItems, 0, null, new Date());
    });
    
    test('it should be able to cancel an order', async () => {
        const memoryRepository = new MemoryRepositoryFactory();
        await memoryRepository.createOrderRepository().save(order);
        const cancelOrderMemory = new CancelOrder(memoryRepository);
        await cancelOrderMemory.execute('202100000001');
    });
    
    test('it should be able to cancel an order using database', async () => {
        const input = new PlaceOrderInput('89207883082', [
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
        const placeOrderDatabase = new PlaceOrder(new DatabaseRepositoryFactory(new DatabaseConnectionAdapter()));
        const output = await placeOrderDatabase.execute(input);
        const databaseRepository = new DatabaseRepositoryFactory(new DatabaseConnectionAdapter());
        const cancelOrderDatabase = new CancelOrder(databaseRepository);
        await cancelOrderDatabase.execute(output.code);
    });
});