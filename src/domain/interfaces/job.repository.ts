import { JobEntity } from '../entities/job.entities';
import { JobModel } from '../models/job.model';

export interface JobRepository {
  save(job: JobModel): string;
  getAll(): Promise<JobEntity[]>;
}
