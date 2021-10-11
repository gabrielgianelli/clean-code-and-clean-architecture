import OrderItem from '../entity/OrderItem';

const DISTANCE: number = 1000;
const MINIMUM_SHIPPING_COST: number = 10;

export default class Shipping {
    static cost(items: OrderItem[]): number {
        const cost = items.reduce(
            (cost, item) => cost += item.shippingCost(DISTANCE),
        0);
        if(cost < MINIMUM_SHIPPING_COST) return MINIMUM_SHIPPING_COST;
        return cost;
    }
}