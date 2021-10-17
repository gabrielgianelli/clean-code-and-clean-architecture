import OrderItem from '../../domain/entity/OrderItem';
import Shipping from '../../domain/entity/Shipping';
import ItemRepository from '../../domain/repository/ItemRepository';
import SimulateShippingInput from '../dto/SimulateShippingInput';
import SimulateShippingOutput from '../dto/SimulateShippingOutput';

export default class SimulateShipping {
    constructor(
        readonly itemRepository: ItemRepository
    ){}

    async execute(simulateShippingInput: SimulateShippingInput): Promise<SimulateShippingOutput> {
        const { items: inputItems } = simulateShippingInput;
        const items = await Promise.all(inputItems.map(async (inputItem) => {
            const item = await this.itemRepository.findById(inputItem.idItem);
            return OrderItem.create(item, inputItem.quantity);
        }));
        const cost = Shipping.cost(items);
        return {
            cost
        };
    }
}