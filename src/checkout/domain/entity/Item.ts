import ShippableItem from "./ShippableItem";

export default class Item implements ShippableItem {
    constructor(
        readonly id: number,
        readonly description: string,
        readonly price: number,
        readonly widthCentimeters: number,
        readonly depthCentimeters: number,
        readonly heightCentimeters: number,
        readonly weightKilograms: number
    ) {}

    volume(): number {
        return this.widthCentimeters * this.depthCentimeters * this.heightCentimeters;
    }

    density(): number {
        return this.weightKilograms / this.volume();
    }
}