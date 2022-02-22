import { Injectable } from '@nestjs/common'
import { ExampleAdapter } from '../../infrastructure/example.repository.adapter'
import { ExampleModel } from '../models/example.model'

@Injectable()
export class ExampleService {
    private exampleRepositoryAdapter: ExampleAdapter;

    constructor(exampleAdapter: ExampleAdapter){
        this.exampleRepositoryAdapter = exampleAdapter;
    }

    create(example: ExampleModel){
        const isUseable = example.verify()

        if(!isUseable){
            return "Cannot create empty example"
        }

        return this.exampleRepositoryAdapter.save(example);
    }
    getAll() {
        return this.exampleRepositoryAdapter.getAll();
    }

    
}