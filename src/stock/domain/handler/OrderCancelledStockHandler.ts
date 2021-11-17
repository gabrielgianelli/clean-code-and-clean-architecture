import OrderCancelled from "../../../shared/domain/event/OrderCancelled";
import Handler from "../../../shared/domain/handler/Handler";
import StockEntry from "../entity/StockEntry";
import StockRepository from "../repository/StockRepository";

export default class OrderCancelledStockHandler implements Handler {
    constructor(readonly stockRepository: StockRepository) {}

    async notify(event: OrderCancelled): Promise<void> {
        event.items.forEach(item => this.stockRepository
            .save(new StockEntry(item.idItem, 'in', item.quantity)));
    }
}