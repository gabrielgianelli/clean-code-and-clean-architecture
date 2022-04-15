import Voucher from "../../../domain/entity/Voucher";
import VoucherRepository from "../../../domain/repository/VoucherRepository";

export default class VoucherRepositoryMemory implements VoucherRepository {
    vouchers: Voucher[];

    constructor(){
        this.vouchers = [
            new Voucher('VALE10', 10),
            new Voucher('VALE10EXPIRADO', 10, new Date(2021, 9, 4)),
        ];
    }

    async findByName(name: string): Promise<Voucher | null> {
        const voucher = this.vouchers.find(voucher => voucher.name === name);
        if (!voucher) return null;
        return voucher;
    }
}