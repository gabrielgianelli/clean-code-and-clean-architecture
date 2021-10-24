import ShippingCalculatorInput from '../../domain/dto/ShippingCalculatorInput';
import AbstractRepositoryFactory from '../../domain/factory/AbstractRepositoryFactory';
import ItemRepository from '../../domain/repository/ItemRepository';
import ShippingCalculator from '../../domain/service/ShippingCalculator';
import SimulateShippingInput from '../dto/SimulateShippingInput';
import SimulateShippingOutput from '../dto/SimulateShippingOutput';

export default class SimulateShipping {
    itemRepository: ItemRepository;

    constructor(readonly abstractRepositoryFactory: AbstractRepositoryFactory) {
        this.itemRepository = abstractRepositoryFactory.createItemRepository();
    }

    async execute(simulateShippingInput: SimulateShippingInput): Promise<SimulateShippingOutput> {
        const { items: inputItems } = simulateShippingInput;
        const items = await Promise.all(inputItems.map(async (inputItem) => {
            const item = await this.itemRepository.findById(inputItem.idItem);
            return new ShippingCalculatorInput(item, inputItem.quantity);
        }));
        const cost = ShippingCalculator.execute(items);
        return {
            cost
        };
    }
}