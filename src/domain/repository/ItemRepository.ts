import Item from "../entity/Item";

export default interface ItemRepository {
    findById(id: number): Item
}