import PlaceOrderInput from "../../src/checkout/application/dto/PlaceOrderInput";
import CancelOrder from "../../src/checkout/application/usecase/CancelOrder";
import PlaceOrder from "../../src/checkout/application/usecase/PlaceOrder";
import Item from "../../src/checkout/domain/entity/Item";
import Order from "../../src/checkout/domain/entity/Order";
import OrderItem from "../../src/checkout/domain/entity/OrderItem";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/checkout/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/checkout/infra/factory/MemoryRepositoryFactory";
import EventBus from "../../src/shared/infra/event/EventBus";
import OrderCancelledStockHandler from "../../src/stock/domain/handler/OrderCancelledStockHandler";
import StockRepositoryDatabase from "../../src/stock/infra/repository/StockRepositoryDatabase";
import OrderPlacedStockHandler from "../../src/stock/domain/handler/OrderPlacedStockHandler";

describe('Cancel Order tests', () => {
    let order: Order;
    let eventBus: EventBus;
    
    beforeEach(() => {
        const orderItems = [
            OrderItem.create(new Item(1, 'PlayStation 5', 4300, 50, 50, 20, 3), 1)
        ];
        order = Order.create(1, '89207883082', orderItems, 0, null, new Date());
        eventBus = new EventBus();
    });
    
    test('it should be able to cancel an order', async () => {
        const memoryRepository = new MemoryRepositoryFactory();
        await memoryRepository.createOrderRepository().save(order);
        const cancelOrderMemory = new CancelOrder(memoryRepository, eventBus);
        await cancelOrderMemory.execute('202100000001');
    });
    
    test('it should be able to cancel an order using database', async () => {
        const databaseConnectionAdapter = new DatabaseConnectionAdapter();
        eventBus.subscribe(
            'OrderPlaced', 
            new OrderPlacedStockHandler(new StockRepositoryDatabase(databaseConnectionAdapter))
        );
        eventBus.subscribe(
            'OrderCancelled', 
            new OrderCancelledStockHandler(new StockRepositoryDatabase(databaseConnectionAdapter))
        );
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
        const placeOrderDatabase = new PlaceOrder(
            new DatabaseRepositoryFactory(databaseConnectionAdapter), 
            eventBus
        );
        const output = await placeOrderDatabase.execute(input);
        const databaseRepository = new DatabaseRepositoryFactory(databaseConnectionAdapter);
        const cancelOrderDatabase = new CancelOrder(databaseRepository, eventBus);
        await cancelOrderDatabase.execute(output.code);
    });
});