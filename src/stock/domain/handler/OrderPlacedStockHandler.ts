import OrderPlaced from "../../../shared/domain/event/OrderPlaced";
import Handler from "../../../shared/domain/handler/Handler";
import StockEntry from "../entity/StockEntry";
import StockRepository from "../repository/StockRepository";

export default class OrderPlacedStockHandler implements Handler {
    constructor(readonly stockRepository: StockRepository) {}

    async notify(event: OrderPlaced): Promise<void> {
        event.items.forEach(async item => await this.stockRepository
            .save(new StockEntry(item.idItem, 'out', item.quantity)));
    }
}