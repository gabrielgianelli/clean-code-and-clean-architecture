import Order from '../src/Order';
import OrderItem from '../src/OrderItem';
import Item from '../src/Item';

describe('Order Tests', () => {
    let invalidCpf: string;
    let validCpf: string;
    let playstation5: Item;
    let nintendoSwitch: Item;
    let notebook: Item;
    let discountPercent: number;
    
    beforeEach(() => {
        invalidCpf = '11111111112';
        validCpf = '89207883082';
        playstation5 = new Item('PlayStation 5', 4300);
        nintendoSwitch = new Item('Nintendo Switch', 2300);
        notebook = new Item('Notebook', 6700);
        discountPercent = 10;
    });
    
    test('it should not to be able to make an order with invalid CPF', 
    () => {
        const order = Order.create(invalidCpf, [
            OrderItem.create(playstation5, 1)
        ]);
        expect(order).toBeNull();
    });
    
    test('it should be able to make an order with 3 items (description, price and quantity)', 
    () => {
        const order = Order.create(validCpf, [
            OrderItem.create(playstation5, 1),
            OrderItem.create(nintendoSwitch, 2),
            OrderItem.create(notebook, 1)
        ]);
        expect(order?.items.length).toBe(3);
    });
    
    test('it should be able to make an order with discount voucher', 
    () => {
        const order = Order.create(validCpf, [
            OrderItem.create(playstation5, 1),
            OrderItem.create(nintendoSwitch, 2),
            OrderItem.create(notebook, 1)
        ], discountPercent);
        expect(order?.total).toBe(14040);
    });
});
