import request from "supertest";
import { app } from "app";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { ICreatePetDTO } from "modules/pets/dtos/ICreatePetDTO";

let connection: Connection;

const species:any = "cat" ;
const gender: any = "female"

const user = {
    id:  uuidV4(),
    name: "Test",
    email: "test@test.com",
    password: "test"
}

const pet:ICreatePetDTO = {    
    id:  uuidV4(),
    name: "Name Test",
    color: "Color Test",
    birthdate: new Date(),
    species,
    breed: "Breed Test",
    gender,
    chip_number: "Chip Number Teste",
    chip_website: "Chip Website Teste",
    weight: 5,
    user_id: user.id
};

describe("Create Appointment Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();        

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, created_at, updated_at) VALUES
            ('${user.id}', '${user.name}', '${user.email}','${user.password}', now(), now())
            `
        );
        await connection.query(
            `INSERT INTO PETS(id, name, color, birthdate, species, breed, 
                gender, chip_number, chip_website, weight, user_id, created_at, updated_at) VALUES
            ('${pet.id}', '${pet.name}', '${pet.color}','now()','${pet.species}', 
            '${pet.breed}', '${pet.gender}', '${pet.chip_number}', '${pet.chip_website}', 
            '${pet.weight}', '${pet.user_id}', now(), now())
            `
        );
    });

    afterAll(async () => {
        await  connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to Create a new Appointment", async () => {
        const response = await request(app).post("/appointments").send({
            name: "Appoinment Test",
            description: "Description Appointment Test",
            pet_id: pet.id,
            date: new Date()
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

});