import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
    items: Item[];

    constructor(){
        this.items = [
            new Item(1, 'PlayStation 5', 4300, 50, 50, 20, 3),
            new Item(2, 'Nintendo Switch', 2300, 40, 40, 15, 0.9),
            new Item(3, 'Notebook', 6700, 50, 40, 10, 2)
        ];
    }

    async findById(id: number): Promise<Item> {
        const item = this.items.find(item => item.id === id);
        if (!item) throw new Error('Item not found');
        return item;
    }

}