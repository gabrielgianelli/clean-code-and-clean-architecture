import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import VoucherRepository from "../../domain/repository/VoucherRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import VoucherRepositoryDatabase from "../repository/database/VoucherRepositoryDatabase";

export default class DatabaseRepositoryFactory implements AbstractRepositoryFactory {
    constructor(
        readonly databaseConnection: DatabaseConnection
    ){}

    createOrderRepository(): OrderRepository {
        return new OrderRepositoryDatabase(this.databaseConnection);
    }
    createItemRepository(): ItemRepository {
        return new ItemRepositoryDatabase(this.databaseConnection);
    }
    createVoucherRepository(): VoucherRepository {
        return new VoucherRepositoryDatabase(this.databaseConnection);
    }
}