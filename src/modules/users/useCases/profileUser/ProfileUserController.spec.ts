
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
    

    it("Should be able to show the Profile of an User by Email", async () => {
        const user = {
            name: "Test",
            email: "test@test.com",
            password: "test"
        }
        await request(app).post("/users").send({
            name: user.name,
            email:  user.email,
            password: user.password
        });

        const response = await request(app).get("/users/search/"+user.email);
                
        expect(response.status).toBe(200);
    }) ;   
})