
import { AppError } from "shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";



let createUserUseCase : CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create User", () => {
    
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory;
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to create a new User", async () => {
        
        await createUserUseCase.execute({
            name: "User test",
            email: "test@email.com",
            password: "test"
        });

        const userCreated = await usersRepositoryInMemory.findByEmail("test@email.com");

        expect(userCreated).toHaveProperty("id");

    });

    it("Should NOT be able to create a User with an already existing e-mail", async () => {        

            await createUserUseCase.execute({
                name: "User test",
                email: "test@email.com",
                password: "test"
            });

             await expect (
                createUserUseCase.execute({
                    name: "Another User test",
                    email: "test@email.com",
                    password: "1234"
                }) 
             ) .rejects.toEqual(new AppError("User already exists!"));
    });

    it("Should NOT be able to create a User with an already existing e-mail", async () => {        

            await createUserUseCase.execute({
                name: "User test",
                email: "test@email.com",
                password: "test"
            });

             await expect (
                createUserUseCase.execute({
                    name: "Another User test",
                    email: "test@email.com",
                    password: "1234"
                }) 
             ) .rejects.toEqual(new AppError("User already exists!"));
    });
})