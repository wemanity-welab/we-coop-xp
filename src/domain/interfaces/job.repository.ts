import { JobEntity } from '../entities/job.entities';
import { JobModel } from '../models/job.model';

export interface JobRepository {
  save(job: JobModel): Promise<string>;
  getAll(): Promise<JobEntity[]>;
  remove(jobId: number): Promise<string>;
}
