import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;


describe("Create Remedie Controlelr", () => {
    
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to Create a new Remedie", async () => {
        const response = await request(app).post("/remedies").send({
            name: "Remedie Test",
            description: "Remedie Description Test",
            expires_date: new Date(),
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });
});
