import { PetsRepositoryInMemory } from "modules/pets/repositories/inMemory/PetsRepositoryInMemory";
import { UsersRepositoryInMemory } from "modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "modules/users/useCases/createUsers/CreateUserUseCase";
import { CreatePetUseCase } from "./CreatePetUseCase";


let createUserUseCase: CreateUserUseCase;
let createPetUseCase: CreatePetUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let petsRepositoryInMemory: PetsRepositoryInMemory;

describe("Create Pet", () => {
    beforeEach(() => {
        petsRepositoryInMemory = new PetsRepositoryInMemory;
        usersRepositoryInMemory = new UsersRepositoryInMemory;
        createPetUseCase = new CreatePetUseCase(petsRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to create a new Pet!", async () => {        
         const species:any = "cat" ;
         const gender: any = "female"

         await createUserUseCase.execute({
            name: "User test",
            email: "test@email.com",
            password: "test"
        });        

        const user = await usersRepositoryInMemory.findByEmail("test@email.com");
        
        const petCreated = await createPetUseCase.execute({
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

        expect(petCreated).toHaveProperty("id");
    })
});