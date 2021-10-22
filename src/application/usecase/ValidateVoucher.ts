import AbstractRepositoryFactory from '../../domain/factory/AbstractRepositoryFactory';
import VoucherRepository from '../../domain/repository/VoucherRepository';
import ValidateVoucherInput from '../dto/ValidateVoucherInput';
import ValidateVoucherOutput from '../dto/ValidateVoucherOutput';

export default class SimulateShipping {
    voucherRepository: VoucherRepository;

    constructor(readonly abstractRepositoryFactory: AbstractRepositoryFactory){
        this.voucherRepository = abstractRepositoryFactory.createVoucherRepository();
    }

    async execute(validateVoucherInput: ValidateVoucherInput): Promise<ValidateVoucherOutput> {
        const { voucherName } = validateVoucherInput;
        const voucher = await this.voucherRepository.findByName(voucherName);
        const isValid = voucher?.isValid() ?? false;
        return {
            isValid
        };
    }
}