import CpfHelper from "./CpfHelper";

describe('CPF Tests', () => {
    test('it should be able to validate a cpf', () => {
        expect(CpfHelper.isValid('892.078.830-82')).toBeTruthy();
        expect(CpfHelper.isValid('737.589.620-80')).toBeTruthy();
    });

    test('it should not be able to validate a cpf when all digits are the same', () => {
        expect(CpfHelper.isValid('111.111.111-11')).toBeFalsy();
    });

    test('it should not be able to validate a cpf with length different than eleven', () => {
        expect(CpfHelper.isValid('892.078.830-820')).toBeFalsy();
        expect(CpfHelper.isValid('892.078.830-8')).toBeFalsy();
    });

    test('it should not be able to validate an empty cpf', () => {
        expect(CpfHelper.isValid('')).toBeFalsy();
        expect(CpfHelper.isValid(null)).toBeFalsy();
        expect(CpfHelper.isValid(undefined)).toBeFalsy();
    });
});