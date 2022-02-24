import { EntityRepository, Repository } from 'typeorm';

import { JobModel } from '../domain/models/job.model';
import { JobEntity } from '../domain/entities/job.entities';

@EntityRepository(JobEntity)
export class JobRepositoryWrapper extends Repository<JobEntity> {
  saveExample(job: JobModel) {
    return this.createQueryBuilder('example')
      .insert()
      .setParameter('description', job.description)
      .execute();
  }
}
