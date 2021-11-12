import app from '../../src/shared/infra/server';
import supertest from 'supertest';

describe('Routes tests', () => {
    test('it should obtain response from /order get', async () => {
        const request = supertest(app);
        const response = await request.get('/order');
        expect(response.statusCode).toBe(200);
    });
    
    test('it should obtain response from /order post', async () => {
        const body = {
            "cpf": "89207883082", 
            "orderItems": [
                {
                    "idItem": 1,
                    "quantity": 1
                },
                {
                    "idItem": 2,
                    "quantity": 2
                },
                {
                    "idItem": 3,
                    "quantity": 1
                }
            ],
            "voucherName": "VALE10"
        };
        const request = supertest(app);
        const response = await request.post('/order').expect("Content-Type", /json/).send(body);
        expect(response.statusCode).toBe(200);
    });

    test('it should obtain response from /order/:order_code get', async () => {
        const request = supertest(app);
        const orderCode = '202100000001';
        const response = await request.get(`/order/${orderCode}`);
        expect(response.statusCode).toBe(200);
    });

    test('it should obtain response from /simulate_shipping post', async () => {
        const body = {
            "items": [
                {
                    "idItem": 1,
                    "quantity": 1
                },
                {
                    "idItem": 2,
                    "quantity": 2
                },
                {
                    "idItem": 3,
                    "quantity": 1
                }
            ]
        };
        const request = supertest(app);
        const response = await request.post('/simulate_shipping').expect("Content-Type", /json/).send(body);
        expect(response.statusCode).toBe(200);
    });

    test('it should obtain response from /validate_voucher post', async () => {
        const body = {
            "voucherName": "VALE10"
        };
        const request = supertest(app);
        const response = await request.post('/validate_voucher').expect("Content-Type", /json/).send(body);
        expect(response.statusCode).toBe(200);
    });
});