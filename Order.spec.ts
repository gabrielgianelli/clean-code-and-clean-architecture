import { Order } from './Order'
import { OrderItem } from './OrderItem'
import { Product } from './Product';

describe('Order Tests', () => {
    const invalidCpf = '11111111112';
    const validCpf = '89207883082';
    const playstation5 = new Product('PlayStation 5', 4300);
    const nintendoSwitch = new Product('Nintendo Switch', 2300);
    const notebook = new Product('Notebook', 6700);
    const discountPercent = 10;
    
    test('it should not to be able to make an order with invalid CPF', 
    () => {
        const order = Order.create(invalidCpf, [
            new OrderItem(playstation5, 1)
        ]);
        expect(order).toBeNull();
    });
    
    test('it should be able to make an order with 3 items (description, price and quantity)', 
    () => {
        const order = Order.create(validCpf, [
            new OrderItem(playstation5, 1),
            new OrderItem(nintendoSwitch, 2),
            new OrderItem(notebook, 1)
        ]);
        expect(order.items.length).toBe(3);
    });
    
    test('it should be able to make an order with discount voucher', 
    () => {
        const order = Order.create(validCpf, [
            new OrderItem(playstation5, 1),
            new OrderItem(nintendoSwitch, 2),
            new OrderItem(notebook, 1)
        ], discountPercent);
        expect(order.total).toBe(14040);
    });
});
