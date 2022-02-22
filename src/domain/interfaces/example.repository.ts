import { ExampleEntity } from "../entities/example.entities";
import { ExampleModel } from "../models/example.model";

export interface ExampleRepository {
    save(example: ExampleModel): string
    getAll(): Promise<ExampleEntity[]>
}