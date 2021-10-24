import Order from "../../src/domain/entity/Order";
import OrderItem from "../../src/domain/entity/OrderItem";
import Item from "../../src/domain/entity/Item";
import Voucher from "../../src/domain/entity/Voucher";
import ShippingCalculator from "../../src/domain/service/ShippingCalculator";
import ShippingCalculatorInput from "../../src/domain/dto/ShippingCalculatorInput";

describe('Order Tests', () => {
    let invalidCpf: string;
    let validCpf: string;
    let playstation5: Item;
    let nintendoSwitch: Item;
    let notebook: Item;
    let voucherName: string;
    let discountPercentage: number;
    let expirationDate: Date;
    let sequence: number;
    
    beforeEach(() => {
        invalidCpf = '11111111112';
        validCpf = '89207883082';
        playstation5 = new Item(1, 'PlayStation 5', 4300, 50, 50, 20, 3);
        nintendoSwitch = new Item(2, 'Nintendo Switch', 2300, 40, 40, 15, 0.9);
        notebook = new Item(3, 'Notebook', 6700, 50, 40, 10, 2);
        voucherName = 'VALE10';
        discountPercentage = 10;
        expirationDate = new Date(2021, 8, 27);
        jest.useFakeTimers('modern');
        sequence = 1;
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('it should not to be able to make an order with invalid CPF', () => {
        expect(() => {
            const orderItems = [OrderItem.create(playstation5, 1)];
            const shippingItems = orderItems.map(item => new ShippingCalculatorInput(item, item.quantity));
            Order.create(
                sequence,
                invalidCpf,
                orderItems,
                ShippingCalculator.execute(shippingItems)
            );
        }).toThrowError(Error);
    });
    
    test('it should be able to make an order with 3 items', () => {
        const orderItems = [
            OrderItem.create(playstation5, 1),
            OrderItem.create(nintendoSwitch, 2),
            OrderItem.create(notebook, 1)
        ];
        const shippingItems = orderItems.map(item => new ShippingCalculatorInput(item, item.quantity));
        const order = Order.create(
            sequence,
            validCpf, 
            orderItems,
            ShippingCalculator.execute(shippingItems)
        );
        expect(order?.items.length).toBe(3);
    });
    
    test('it should be able to make an order with discount voucher', () => {
        const voucher = new Voucher(voucherName, discountPercentage);
        jest.setSystemTime(expirationDate);
        const orderItems = [
            OrderItem.create(playstation5, 1),
            OrderItem.create(nintendoSwitch, 2),
            OrderItem.create(notebook, 1)
        ];
        const shippingItems = orderItems.map(item => new ShippingCalculatorInput(item, item.quantity));
        const order = Order.create(
            sequence,
            validCpf, 
            orderItems,
            ShippingCalculator.execute(shippingItems),
            voucher
        );
        expect(order?.total).toBe(14101.2);
    });

    test('it should be able to make an order with minimum shipping cost', () => {
        const orderItems = [OrderItem.create(nintendoSwitch, 1)];
        const shippingItems = orderItems.map(item => new ShippingCalculatorInput(item, item.quantity));
        const order = Order.create(
            sequence,
            validCpf, 
            orderItems,
            ShippingCalculator.execute(shippingItems)
        );
        expect(order?.total).toBe(2310);
    })
});
