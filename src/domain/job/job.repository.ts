import { JobDomain } from './job.domain';

export interface JobRepository {
  save(job: JobDomain): Promise<string>;
  getAll(): Promise<JobDomain[]>;
  remove(jobId: number): Promise<string>;
  update(jobId: number, job: JobDomain): Promise<JobDomain>;
  getJob(jobId: number): Promise<JobDomain>;
}
