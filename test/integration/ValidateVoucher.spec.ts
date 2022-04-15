import ValidateVoucher from "../../src/checkout/application/usecase/ValidateVoucher";
import DatabaseRepositoryFactory from "../../src/checkout/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/checkout/infra/factory/MemoryRepositoryFactory";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";

describe('Validate Voucher tests', () => {
    test('it should be able to validate a voucher', async () => {
        const input = {
            voucherName: 'VALE10'
        };
        const validateVoucher = new ValidateVoucher(new MemoryRepositoryFactory());
        const output = await validateVoucher.execute(input);
        expect(output.isValid).toBe(true);
    });

    test('it should not be able to validate an invalid voucher', async () => {
        const input = {
            voucherName: 'VALE11'
        };
        const validateVoucher = new ValidateVoucher(new MemoryRepositoryFactory());
        const output = await validateVoucher.execute(input);
        expect(output.isValid).toBe(false);
    });

    test('it should be able to validate a voucher in database', async () => {
        const input = {
            voucherName: 'VALE10'
        };
        const validateVoucher = new ValidateVoucher(new DatabaseRepositoryFactory(new DatabaseConnectionAdapter()));
        const output = await validateVoucher.execute(input);
        expect(output.isValid).toBe(true);
    });

    test('it should not be able to validate an invalid voucher in database', async () => {
        const input = {
            voucherName: 'VALE11'
        };
        const validateVoucher = new ValidateVoucher(new DatabaseRepositoryFactory(new DatabaseConnectionAdapter()));
        const output = await validateVoucher.execute(input);
        expect(output.isValid).toBe(false);
    });
});