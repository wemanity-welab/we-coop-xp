import { EntityRepository, Repository } from 'typeorm';

import { ExampleModel } from '../domain/models/example.model';
import { ExampleEntity } from '../domain/entities/example.entities';

@EntityRepository(ExampleEntity)
export class ExampleRepositoryWrapper extends Repository<ExampleEntity> {
  saveExample(example: ExampleModel) {
    return this.createQueryBuilder('example')
      .insert()
      .setParameter('description', example.description)
      .execute();
  }
}
