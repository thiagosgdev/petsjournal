import { PetsRepositoryInMemory } from "modules/pets/repositories/inMemory/PetsRepositoryInMemory";
import { UsersRepositoryInMemory } from "modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "modules/users/useCases/createUsers/CreateUserUseCase";
import { AppError } from "shared/errors/AppError";
import { CreatePetUseCase } from "./CreatePetUseCase";


let createUserUseCase: CreateUserUseCase;
let createPetUseCase: CreatePetUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let petsRepositoryInMemory: PetsRepositoryInMemory;

describe("Create Pet", () => {
    beforeEach(() => {
        petsRepositoryInMemory = new PetsRepositoryInMemory;
        usersRepositoryInMemory = new UsersRepositoryInMemory;
        createPetUseCase = new CreatePetUseCase(petsRepositoryInMemory, usersRepositoryInMemory);
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
    it("Should NOT be able to create a new Pet with an non existing USER ID", async () => {
        const species:any = "cat" ;
        const gender: any = "female"

        expect (async () => {
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
                user_id: "NON EXISTING ID"
            });    
        }).rejects.toEqual(new AppError("User doesn't exists!"));            
    });

    it("Should NOT be able to create a new Pet with an existing chip number!", async () => {        
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
       
        await expect(
                createPetUseCase.execute({
                name: "Another pet",
                species,
                gender,
                breed: "SRD",
                color: "white",
                weight: 2,        
                birthdate: new Date(),
                chip_number: "123123",
                chip_website:"site.com",
                user_id: user.id
           
        })).rejects.toEqual(new AppError("Pet already Exists!"));
    
   })
});