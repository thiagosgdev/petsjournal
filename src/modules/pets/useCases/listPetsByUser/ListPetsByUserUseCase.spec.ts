import { PetsRepositoryInMemory } from "modules/pets/repositories/inMemory/PetsRepositoryInMemory";
import { UsersRepositoryInMemory } from "modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "modules/users/useCases/createUsers/CreateUserUseCase";
import { AppError } from "shared/errors/AppError";
import { CreatePetUseCase } from "../createPet/CreatePetUseCase";
import { ListPetsByUserUseCase } from "./ListPetsByUserUseCase";


let createUserUseCase: CreateUserUseCase;
let createPetUseCase: CreatePetUseCase;
let listPetsByUserUseCase: ListPetsByUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let petsRepositoryInMemory: PetsRepositoryInMemory;

describe("List Pets",  () => {
    beforeEach(() => {
        petsRepositoryInMemory = new PetsRepositoryInMemory;
        usersRepositoryInMemory = new UsersRepositoryInMemory;
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        createPetUseCase = new CreatePetUseCase(petsRepositoryInMemory, usersRepositoryInMemory);
        listPetsByUserUseCase = new ListPetsByUserUseCase(petsRepositoryInMemory);
    });

    it("Should be able to list all Pets from a User ID", async () => {
        const species:any = "cat" ;
        const gender: any = "female"

        await createUserUseCase.execute({
            name: "User test",
            email: "test@email.com",
            password: "test"
        });        

        const user = await usersRepositoryInMemory.findByEmail("test@email.com");
        
        await createPetUseCase.execute({
            name: "Pet Test",
            species,
            gender,
            breed: "SRD",
            color: "Test",
            weight: 5,        
            birthdate: new Date(),
            chip_number: "123123",
            chip_website:"test;com.br",
            user_id: user.id
        });

        const pets = await listPetsByUserUseCase.execute(user.id);

        expect(pets.length).toBeGreaterThan(0);
    });

    it("Should NOT be able to list pets for an non existing User ID", async () => {

        const species:any = "cat" ;
        const gender: any = "female"

        await createUserUseCase.execute({
            name: "User test",
            email: "test@email.com",
            password: "test"
        });        

        const user = await usersRepositoryInMemory.findByEmail("test@email.com");
        const randomUserID = "fd01e5b8-1936-4f72-ac12-34e2d23a4df6";
        
        await createPetUseCase.execute({
            name: "Pet Test",
            species,
            gender,
            breed: "SRD",
            color: "Test",
            weight: 5,        
            birthdate: new Date(),
            chip_number: "123123",
            chip_website:"test;com.br",
            user_id: user.id
        });

        await expect (
             listPetsByUserUseCase.execute(randomUserID)
        ).rejects.toEqual(new AppError("No pet found for this User!"));
    });
});
