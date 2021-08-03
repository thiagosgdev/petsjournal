
import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "../../../../app";

let connection: Connection;


describe("Create User Controller", () => {


    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await  connection.dropDatabase();
        await connection.close();
    });
    

    it("Should be able to Create a new User", async () => {
        const response = await request(app).post("/users").send({
            name: "Test",
            email: "test@test.com",
            password: "test"
        });
        
        expect(response.status).toBe(201);
    }) ;   
})