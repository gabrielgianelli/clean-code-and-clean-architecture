export default class Item {
    constructor(
        readonly id: number,
        readonly description: string,
        readonly price: number,
        readonly widthCentimeters: number,
        readonly depthCentimeters: number,
        readonly heightCentimeters: number,
        readonly weightKilograms: number
    ) {}
}