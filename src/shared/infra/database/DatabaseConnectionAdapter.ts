import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

export default class DatabaseConnectionAdapter implements DatabaseConnection {
    pgp: any;
    
    constructor() {
        this.pgp = pgp()('postgres://postgres:root@localhost:5432/ccca');
    }

    query(statement: string, params: any) {
        return this.pgp.query(statement, params);
    }
}