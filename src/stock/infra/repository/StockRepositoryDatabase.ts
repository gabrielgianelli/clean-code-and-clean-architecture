import DatabaseConnection from "../../../shared/infra/database/DatabaseConnection";
import StockEntry from "../../domain/entity/StockEntry";
import StockRepository from "../../domain/repository/StockRepository";

export default class StockRepositoryDatabase implements StockRepository {
    constructor(readonly databaseConnection: DatabaseConnection) {}

    async save(stockEntry: StockEntry): Promise<void> {
        await this.databaseConnection.query(`
            insert into ccca.stock_entry (
                id_item,
                operation,
                quantity
            ) values (
                $1,
                $2,
                $3
            )
        `, [
            stockEntry.idItem,
            stockEntry.operation,
            stockEntry.quantity
        ]);
    }
}