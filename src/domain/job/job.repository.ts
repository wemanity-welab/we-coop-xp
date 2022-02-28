import { JobDomain } from './job.domain';

export interface JobRepository {
  save(job: JobDomain): string;
  getAll(): Promise<JobDomain[]>;
  remove(jobId: number): Promise<string>;
}
