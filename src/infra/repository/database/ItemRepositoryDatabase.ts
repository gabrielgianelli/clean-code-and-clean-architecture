import DatabaseConnection from '../../database/DatabaseConnection';
import Item from '../../../domain/entity/Item';
import ItemRepository from '../../../domain/repository/ItemRepository'

export default class ItemRepositoryDatabase implements ItemRepository {
    constructor(
        readonly databaseConnection: DatabaseConnection
    ){}
    
    async findById(id: number): Promise<Item> {
        const [itemData] = await this.databaseConnection
            .query('select * from ccca.item where id = $1', [id]);
        const item = new Item(
            itemData.id, 
            itemData.description, 
            parseFloat(itemData.price), 
            parseFloat(itemData.width),
            parseFloat(itemData.depth),
            parseFloat(itemData.height),
            parseFloat(itemData.weight)
        );
        return item;
    }
}