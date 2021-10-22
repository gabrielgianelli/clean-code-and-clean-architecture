import { Request, Response } from 'express';
import ValidateVoucher from '../../application/usecase/ValidateVoucher';
import DatabaseConnectionAdapter from '../database/DatabaseConnectionAdapter';
import DatabaseRepositoryFactory from '../factory/DatabaseRepositoryFactory';

export default class ValidateVoucherController {
    async create(request: Request, response: Response): Promise<Response> {
        const { voucherName } = request.body;
        const validateVoucher = new ValidateVoucher(
            new DatabaseRepositoryFactory(new DatabaseConnectionAdapter())
        );
        const output = await validateVoucher.execute({ voucherName });
        return response.json(output);
    }
}