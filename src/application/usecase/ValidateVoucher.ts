import VoucherRepository from '../../domain/repository/VoucherRepository';
import ValidateVoucherInput from '../dto/ValidateVoucherInput';
import ValidateVoucherOutput from '../dto/ValidateVoucherOutput';

export default class SimulateShipping {
    constructor(
        readonly voucherRepository: VoucherRepository
    ){}

    async execute(validateVoucherInput: ValidateVoucherInput): Promise<ValidateVoucherOutput> {
        const { voucherName } = validateVoucherInput;
        const voucher = await this.voucherRepository.findByName(voucherName);
        const isValid = voucher.isValid();
        return {
            isValid
        };
    }
}