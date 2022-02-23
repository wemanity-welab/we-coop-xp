import { EntityRepository, Repository } from 'typeorm';

import { JobsModel } from '../domain/models/jobs.model';
import { JobsEntity } from '../domain/entities/jobs.entities';

@EntityRepository(JobsEntity)
export class JobsRepositoryWrapper extends Repository<JobsEntity> {
  saveExample(job: JobsModel) {
    return this.createQueryBuilder('example')
      .insert()
      .setParameter('description', job.description)
      .execute();
  }
}
