import PlaceOrder from '../../src/checkout/application/usecase/PlaceOrder';
import DatabaseConnectionAdapter from '../../src/shared/infra/database/DatabaseConnectionAdapter';
import PlaceOrderInput from '../../src/checkout/application/dto/PlaceOrderInput';
import DatabaseRepositoryFactory from '../../src/checkout/infra/factory/DatabaseRepositoryFactory';
import MemoryRepositoryFactory from '../../src/checkout/infra/factory/MemoryRepositoryFactory';
import EventBus from '../../src/shared/infra/event/EventBus';
import OrderPlacedStockHandler from '../../src/stock/domain/handler/OrderPlacedStockHandler';
import StockRepositoryDatabase from '../../src/stock/infra/repository/StockRepositoryDatabase';

describe('Place Order tests', () => {
    let input: PlaceOrderInput;
    let eventBus: EventBus;

    beforeEach(() => {
        input = new PlaceOrderInput('89207883082', [
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
        eventBus = new EventBus();
    });
    
    test('it should be able to place an order', async () => {
        const placeOrderMemory = new PlaceOrder(new MemoryRepositoryFactory(), eventBus);
        const output = await placeOrderMemory.execute(input);
        expect(output.total).toBe(14101.2);
    });
    
    test('it should be able to place an order using items in database', async () => {
        const databaseConnectionAdapter = new DatabaseConnectionAdapter();
        eventBus.subscribe('OrderPlaced', new OrderPlacedStockHandler(new StockRepositoryDatabase(databaseConnectionAdapter)))
        const placeOrderDatabase = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnectionAdapter), eventBus);
        const output = await placeOrderDatabase.execute(input);
        expect(output.total).toBe(14101.2);
    });
});