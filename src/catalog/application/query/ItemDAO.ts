import ItemDTO from "../dto/ItemDTO";

export default interface ItemDAO {
    getItems(): Promise<ItemDTO[]>;
    save(itemDTO: ItemDTO): Promise<void>;
}