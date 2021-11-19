import ValidateVoucher from '../../application/usecase/ValidateVoucher';
import DatabaseRepositoryFactory from '../factory/DatabaseRepositoryFactory';

export default class ValidateVoucherController {
    constructor(readonly databaseRepositoryFactory: DatabaseRepositoryFactory) {}

    async create(params: any, body: any) {
        const { voucherName } = body;
        const validateVoucher = new ValidateVoucher(this.databaseRepositoryFactory);
        return await validateVoucher.execute({ voucherName });
    }
}