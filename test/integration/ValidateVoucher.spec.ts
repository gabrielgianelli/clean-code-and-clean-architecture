import ValidateVoucher from "../../src/application/usecase/ValidateVoucher";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

describe('Validate Voucher tests', () => {
    test('it should be able to validate a voucher', async () => {
        const input = {
            voucherName: 'VALE10'
        };
        const validateVoucher = new ValidateVoucher(new MemoryRepositoryFactory());
        const output = await validateVoucher.execute(input);
        expect(output.isValid).toBe(true);
    });
});