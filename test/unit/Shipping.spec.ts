import Item from "../../src/domain/entity/Item";
import OrderItem from "../../src/domain/entity/OrderItem";
import Shipping from "../../src/domain/entity/Shipping";

describe('Shipping tests', () => {
    test('it should be able to calculate a shipping cost', () => {
        const orderItems = [
            OrderItem.create(new Item(1, 'PlayStation 5', 4300, 50, 50, 20, 3), 1)
        ]
        const cost = Shipping.cost(orderItems);
        expect(cost).toBe(30);
    });

    test('it should be able to calculate a shipping cost with the minimum value', () => {
        const orderItems = [
            OrderItem.create(new Item(2, 'Nintendo Switch', 2300, 40, 40, 15, 0.9), 1)
        ]
        const cost = Shipping.cost(orderItems);
        expect(cost).toBe(10);
    });
});