import ShippingCalculatorInput from "../../src/domain/dto/ShippingCalculatorInput";
import Item from "../../src/domain/entity/Item";
import ShippingCalculator from "../../src/domain/service/ShippingCalculator";


describe('Shipping tests', () => {
    test('it should be able to calculate a shipping cost', () => {
        const orderItems = [
            new ShippingCalculatorInput(new Item(1, 'PlayStation 5', 4300, 50, 50, 20, 3), 1)
        ]
        const cost = ShippingCalculator.execute(orderItems);
        expect(cost).toBe(30);
    });

    test('it should be able to calculate a shipping cost with the minimum value', () => {
        const orderItems = [
            new ShippingCalculatorInput(new Item(2, 'Nintendo Switch', 2300, 40, 40, 15, 0.9), 1)
        ]
        const cost = ShippingCalculator.execute(orderItems);
        expect(cost).toBe(10);
    });
});