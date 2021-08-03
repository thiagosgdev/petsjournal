import request from "supertest";
import { Connection, createConnection } from "typeorm";
import {v4 as uuidV4} from "uuid";

import { app } from "../../../../app";

let connection: Connection;
const user = {
    id:  uuidV4(),
    name: "Test",
    email: "test@test.com",
    password: "test"
}

describe("Create Pet Controller",   () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();        

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, created_at, updated_at) VALUES
            ('${user.id}', '${user.name}', '${user.email}','${user.password}', now(), now())
            `
        );
    });

    afterAll(async () => {
        await  connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to Create a new Pet", async () => {

        const response = await request(app).post("/pets").send({
            name: "Pet test",
            species: "cat",
            gender: "female",
            breed: "SRD",
            color: "white",
            weight: 6,
            birthdate: "2021-07-23",
            chip_number: "123456",
            chip_website: "www.test.com",
            user_id: user.id
        });       

        expect(response.status).toBe(201)
        
    });

    it("Should NOT be able to Create a new Pet with an existing chip_number", async () => {

        const response = await request(app).post("/pets").send({
            name: "Pet test",
            species: "cat",
            gender: "female",
            breed: "SRD",
            color: "white",
            weight: 6,
            birthdate: "2021-07-23",
            chip_number: "123456",
            chip_website: "www.test.com",
            user_id: user.id
        });       

        expect(response.body.message).toBe("Pet already Exists!");
        expect(response.status).toBe(400);
    });
});