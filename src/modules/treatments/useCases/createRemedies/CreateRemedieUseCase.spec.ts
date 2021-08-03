import { RemediesRepositoryInMemory } from "modules/treatments/repositories/inMemory/RemediesRepositoryInMemory";
import { CreateRemedieUseCase } from "./CreateRemedieUseCase";


let createRemedieUseCase: CreateRemedieUseCase;
let remediesRepositoryInMemory: RemediesRepositoryInMemory;

describe("Create Remedie", ()=> {
    
    beforeEach(() => {
        remediesRepositoryInMemory = new RemediesRepositoryInMemory;
        createRemedieUseCase = new CreateRemedieUseCase(remediesRepositoryInMemory)
    });

    it("Should be able to Create a new Remedy", async () => {
        const remedie = await createRemedieUseCase.execute({
            name: "Remedie Test",
            description: "Some description",
            expires_date: new Date()
        });

        expect(remedie).toHaveProperty("id");        
    });
});