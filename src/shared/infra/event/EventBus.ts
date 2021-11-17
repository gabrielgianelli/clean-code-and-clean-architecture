import DomainEvent from "../../domain/event/DomainEvent";
import Handler from "../../domain/handler/Handler";

export default class EventBus {
    private consumers: { eventName: string, handler: Handler }[];
    
    constructor(){
        this.consumers = [];
    }

    subscribe(eventName: string, handler: Handler): void {
        this.consumers.push({ eventName, handler });
    }

    async publish(event: DomainEvent): Promise<void> {
        this.consumers
            .filter(consumer => consumer.eventName === event.name)
            .forEach(async consumer => await consumer.handler.notify(event));
    }
}