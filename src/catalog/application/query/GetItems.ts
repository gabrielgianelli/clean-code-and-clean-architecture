import ItemDTO from "../dto/ItemDTO";
import ItemDAO from "./ItemDAO";

export default class GetItems {
    constructor(readonly itemDao: ItemDAO) {}

    async execute(): Promise<ItemDTO[]> {
        return await this.itemDao.getItems();
    }
}