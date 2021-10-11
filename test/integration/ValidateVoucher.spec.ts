import ValidateVoucher from "../../src/application/usecase/ValidateVoucher";
import VoucherRepositoryMemory from "../../src/infra/repository/memory/VoucherRepositoryMemory";

describe('Validate Voucher tests', () => {
    test('it should be able to validate a voucher', async () => {
        const input = {
            voucherName: 'VALE10'
        };
        const validateVoucher = new ValidateVoucher(new VoucherRepositoryMemory());
        const output = await validateVoucher.execute(input);
        expect(output.isValid).toBe(true);
    });
});