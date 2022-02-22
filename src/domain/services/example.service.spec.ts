import { ExampleService } from './example.service'
import { ExampleModel } from '../models/example.model';
import { ExampleRepository } from '../interfaces/example.repository';
import { ExampleEntity } from '../entities/example.entities';
import { ExampleAdapter } from '../../infrastructure/example.repository.adapter';

const completeExample = new ExampleModel("yes")

describe("Example services", ()=> {
    const exampleAdapter = new ExampleAdapter(undefined);

    exampleAdapter.save = (example: ExampleModel) => {
        return "Success";
    };

    exampleAdapter.getAll = (): Promise<ExampleEntity[]> =>{
        throw new Error('Function not implemented.');
    };
    
    const exampleService = new ExampleService(exampleAdapter)

    it("Should send message successfully", () => {
        expect(exampleService.create(completeExample)).toBe('Success')
    });
})