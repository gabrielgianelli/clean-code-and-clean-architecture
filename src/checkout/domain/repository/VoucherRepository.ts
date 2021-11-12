import Voucher from "../entity/Voucher";

export default interface VoucherRepository {
    findByName(name: string): Promise<Voucher | null>
}