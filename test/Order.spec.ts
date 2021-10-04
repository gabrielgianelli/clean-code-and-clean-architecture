import Order from '../src/Order';
import OrderItem from '../src/OrderItem';
import Item from '../src/Item';
import Voucher from '../src/Voucher';

describe('Order Tests', () => {
    let invalidCpf: string;
    let validCpf: string;
    let playstation5: Item;
    let nintendoSwitch: Item;
    let notebook: Item;
    let discountPercentage: number;
    let expirationDate: Date;
    
    beforeEach(() => {
        invalidCpf = '11111111112';
        validCpf = '89207883082';
        playstation5 = new Item('PlayStation 5', 4300, 50, 50, 20, 3);
        nintendoSwitch = new Item('Nintendo Switch', 2300, 40, 40, 15, 0.9);
        notebook = new Item('Notebook', 6700, 50, 40, 10, 2);
        discountPercentage = 10;
        expirationDate = new Date(2021, 8, 27);
        jest.useFakeTimers('modern');
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('it should not to be able to make an order with invalid CPF', () => {
        const order = Order.create(
            invalidCpf,
            [OrderItem.create(playstation5, 1)]
        );
        expect(order).toBeNull();
    });
    
    test('it should be able to make an order with 3 items', () => {
        const order = Order.create(
            validCpf, 
            [
                OrderItem.create(playstation5, 1),
                OrderItem.create(nintendoSwitch, 2),
                OrderItem.create(notebook, 1)
            ]
        );
        expect(order?.items.length).toBe(3);
    });
    
    test('it should be able to make an order with discount voucher', () => {
        const voucher = new Voucher(discountPercentage, expirationDate);
        jest.setSystemTime(expirationDate);
        const order = Order.create(
            validCpf, 
            [
                OrderItem.create(playstation5, 1),
                OrderItem.create(nintendoSwitch, 2),
                OrderItem.create(notebook, 1)
            ],
            voucher
        );
        expect(order?.total).toBe(14101.2);
    });

    test('it should not be able to make an order with an expired voucher', () => {
        const voucher = new Voucher(discountPercentage, expirationDate);
        const order = Order.create(
            validCpf, 
            [
                OrderItem.create(playstation5, 1),
                OrderItem.create(nintendoSwitch, 2),
                OrderItem.create(notebook, 1)
            ], 
            voucher);
        expect(order?.total).toBe(15668);
    });

    test('it should be able to make an order with minimum shipping cost', () => {
        const order = Order.create(
            validCpf, 
            [OrderItem.create(nintendoSwitch, 1)]
        );
        expect(order?.total).toBe(2310);
    })
});
