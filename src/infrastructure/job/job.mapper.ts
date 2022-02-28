import { JobDomain } from '../../domain/job/job.domain';
import { JobEntity } from './job.entity';

export class JobMapper {
  static mapper(jobArray) {
    return jobArray.map((job: JobEntity) => new JobDomain(job));
  }
}
