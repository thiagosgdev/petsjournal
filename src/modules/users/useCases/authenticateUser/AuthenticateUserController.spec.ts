import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm"
import { app } from "app";
import { v4 as uuidV4 } from "uuid";


let connection: Connection;

describe("Authenticate User Controller",  () => {    

    beforeAll( async () => {        
        connection = await createConnection();
        await connection.runMigrations();

        let user = {
            id:  uuidV4(),
            name: "Test",
            email: "test@test.com",
            password:  await hash("test", 8)
        }

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, created_at, updated_at) VALUES
            ('${user.id}', 'Test', 'test@test.com','${user.password}', now(), now())
            `
        );                        
    });

    afterAll(async () => {
        await  connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to Authenticate an existing User", async () => {

        const response = await request(app).post("/login").send({
            email: "test@test.com",
            password: "test"
        });      

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("refresh_token");
    });

    it("Should NOT be able to logging an existing unmatching email", async () => {

        const response = await request(app).post("/login").send({
            email: "WRONG",
            password: "test"
        });      

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email or password incorrect!")
    });

    it("Should NOT be able to logging an existing unmatching password", async () => {

        const response = await request(app).post("/login").send({
            email: "test@test.com",
            password: "WRONG"
        });      

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email or password incorrect!")
    });
})