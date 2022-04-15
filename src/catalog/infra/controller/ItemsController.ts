import ItemDTO from "../../application/dto/ItemDTO";
import GetItems from "../../application/query/GetItems";
import ItemDAO from "../../application/query/ItemDAO";

export default class ItemsController {
    constructor(readonly itemDAO: ItemDAO) {}

    async index(params: any, body: any): Promise<ItemDTO[]> {
        const getItems = new GetItems(this.itemDAO);
        return await getItems.execute();
    }
}