import Voucher from '../../../domain/entity/Voucher';
import VoucherRepository from '../../../domain/repository/VoucherRepository';
import DatabaseConnection from '../../database/DatabaseConnection';

export default class VoucherRepositoryDatabase implements VoucherRepository {
    constructor(
        readonly databaseConnection: DatabaseConnection
    ) {}

    async findByName(name: string): Promise<Voucher | null> {
        if(!name) return null;
        const [voucherData] = await this.databaseConnection
            .query('select * from ccca.voucher where name = $1', [name]);
        const voucher = new Voucher(
            voucherData.name, 
            voucherData.percentage, 
            voucherData.expire_date
        );
        return voucher;
    }
}