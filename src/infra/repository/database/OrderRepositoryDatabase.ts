import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DatabaseConnection from "../../database/DatabaseConnection";

export default class OrderRepositoryDatabase implements OrderRepository {
     constructor(
        readonly databaseConnection: DatabaseConnection
     ){}

     async save(order: Order): Promise<void> {
        await this.databaseConnection
            .query(`
                insert into ccca.order (
                    id, voucher, code, cpf, issue_date, shipping_cost, total
                ) values (
                    $1, $2, $3, $4, $5, $6, $7
                )`, [
                    order.id,
                    order.voucher?.name,
                    order.code.value,
                    order.cpf,
                    order.issueDate,
                    order.shippingCost,
                    order.total
                ]);
        order.items.forEach(async (item) => {
            await this.databaseConnection
                .query(`
                    insert into ccca.order_item (
                        id_order, id_item, price, width, depth, height, weight, quantity
                    ) values (
                        $1, $2, $3, $4, $5, $6, $7, $8
                    )`, [
                        order.id,
                        item.id,
                        item.price,
                        item.widthCentimeters,
                        item.depthCentimeters,
                        item.heightCentimeters,
                        item.weightKilograms,
                        item.quantity
                    ]);
        });        
    }

    async sequence(): Promise<number> {
        const [data] = await this.databaseConnection
            .query(`select nextval(pg_get_serial_sequence('ccca.order', 'id')) as sequence;`, []);
        return parseInt(data.sequence);
    }
}