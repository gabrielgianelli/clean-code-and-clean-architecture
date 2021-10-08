import Item from "./Item";

export default interface ItemRepository {
    findById(id: number): Item
}