import { Router } from 'express';
import OrderController from '../../../checkout/infra/controllers/OrderController';
import SimulateShippingController from '../../../checkout/infra/controllers/SimulateShippingController';
import ValidateVoucherController from '../../../checkout/infra/controllers/ValidateVoucherController';

const routes = Router();

const orderController = new OrderController();
routes.post('/order', orderController.create);
routes.get('/order', orderController.index);
routes.get('/order/:order_code', orderController.show);

const simulateShippingController = new SimulateShippingController();
routes.post('/simulate_shipping', simulateShippingController.create);

const validateVoucherController = new ValidateVoucherController();
routes.post('/validate_voucher', validateVoucherController.create);

export default routes;