import OrderCode from "../../src/checkout/domain/entity/OrderCode";

describe('Order Code tests', () => {
    test('it should generate an order code', () => {
        const date = new Date(2021, 9, 4);
        const sequence = 1;
        const orderCode = new OrderCode(date, sequence);
        expect(orderCode.value).toBe('202100000001');
    });
});