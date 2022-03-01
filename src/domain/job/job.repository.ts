import { JobDomain } from './job.domain';
import { JobEntity } from '../../infrastructure/job/job.entity';

export interface JobRepository {
  save(job: JobDomain): string;
  getAll(): Promise<JobDomain[]>;
  remove(jobId: number): Promise<string>;
  update(jobId: number, job: JobDomain): Promise<JobEntity>;
}
