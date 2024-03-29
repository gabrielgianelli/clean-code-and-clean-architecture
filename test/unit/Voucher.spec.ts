import Voucher from "../../src/checkout/domain/entity/Voucher";

describe('Voucher Tests', () => {
    test('it should be able to create a valid voucher with no expiration date', () => {
        const voucher = new Voucher('VALE10', 10);
        expect(voucher.discountPercentage()).toBe(10);
    });

    test('it should be able to create a valid voucher with expiration date', () => {
        const voucher = new Voucher('VALE10', 10, new Date(2021, 8, 27));
        expect(voucher.discountPercentage(new Date(2021, 8, 27))).toBe(10);
    });

    test('it should be able to create a expired voucher', () => {
        const voucher = new Voucher('VALE10', 10, new Date(2021, 8, 27));
        expect(voucher.discountPercentage(new Date(2021, 8, 28))).toBe(0);
    });

    test('it should not be able to create a voucher with a discount greater than 100', () => {
        expect(() => new Voucher('VALE101', 101)).toThrowError(Error);
    });

    test('it should not be able to create a voucher with a discount lesser than 0', () => {
        expect(() => new Voucher('VALEMENOS1', -1)).toThrowError(Error);
    });
});