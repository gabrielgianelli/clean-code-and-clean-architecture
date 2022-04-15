import ValidateVoucher from '../../application/usecase/ValidateVoucher';
import AbstractRepositoryFactory from '../../domain/factory/AbstractRepositoryFactory';

export default class ValidateVoucherController {
    constructor(readonly abstractRepositoryFactory: AbstractRepositoryFactory) {}

    async create(params: any, body: any) {
        const { voucherName } = body;
        const validateVoucher = new ValidateVoucher(this.abstractRepositoryFactory);
        return await validateVoucher.execute({ voucherName });
    }
}