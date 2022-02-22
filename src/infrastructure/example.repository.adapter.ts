import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExampleModel } from '../domain/models/example.model';
import { ExampleRepository } from '../domain/interfaces/example.repository';
import { ExampleEntity } from '../domain/entities/example.entities';

@Injectable()
export class ExampleAdapter implements ExampleRepository {
  constructor(
    @InjectRepository(ExampleEntity)
    private readonly exampleEntityRepository: Repository<ExampleEntity>,
  ) {}

  public save(example: ExampleModel) {
    this.exampleEntityRepository.save(example);

    return 'Success';
  }
  public getAll() {
    return this.exampleEntityRepository.find();
  }
}
