import ShippingCalculatorInput from '../dto/ShippingCalculatorInput';

const DISTANCE: number = 1000;
const MINIMUM_SHIPPING_COST: number = 10;

export default class ShippingCalculator {
    static execute(items: ShippingCalculatorInput[]): number {
        const freight = items.reduce((cost, item) => cost += 
            DISTANCE * item.props.volume() * (item.props.density() / 100) * item.quantity,
        0);
        if(freight < MINIMUM_SHIPPING_COST) return MINIMUM_SHIPPING_COST;
        return freight;
    }
}