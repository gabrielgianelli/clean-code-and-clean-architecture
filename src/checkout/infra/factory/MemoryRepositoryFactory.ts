import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import VoucherRepository from "../../domain/repository/VoucherRepository";
import OrderRepositoryMemory from "../repository/memory/OrderRepositoryMemory";
import ItemRepositoryMemory from "../repository/memory/ItemRepositoryMemory";
import VoucherRepositoryMemory from "../repository/memory/VoucherRepositoryMemory";

export default class MemoryRepositoryFactory implements AbstractRepositoryFactory {
    private static orderRepository: OrderRepository;

    createOrderRepository(): OrderRepository {
        if (!MemoryRepositoryFactory.orderRepository) {
            MemoryRepositoryFactory.orderRepository = new OrderRepositoryMemory();
        }
        return MemoryRepositoryFactory.orderRepository;
    }
    createItemRepository(): ItemRepository {
        return new ItemRepositoryMemory();
    }
    createVoucherRepository(): VoucherRepository {
        return new VoucherRepositoryMemory();
    }
}