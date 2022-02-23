import { JobsEntity } from '../entities/jobs.entities';
import { JobsModel } from '../models/jobs.model';

export interface JobsRepository {
  save(job: JobsModel): string;
  getAll(): Promise<JobsEntity[]>;
}
