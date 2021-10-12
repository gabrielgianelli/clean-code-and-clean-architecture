import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";

describe('DatabaseConnection tests', () => {
    test('it should be able to create a connection with the database', async () => {
        const databaseConnection = new DatabaseConnectionAdapter();
        const items = await databaseConnection.query('select * from ccca.item', []);
        expect(items).toHaveLength(3);
    });
});