import Order from "../../domain/entity/Order";
import FindOrderOutput from "./FindOrderOutput";

export default class FindOrderOutputAssembler {
    static assembly(order: Order) {
        return new FindOrderOutput(
            order.code.value, 
            order.cpf, 
            order.issueDate, 
            order.total
        );
    }
}