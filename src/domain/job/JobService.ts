import { Inject, Injectable } from '@nestjs/common';
import { JobDomain } from './JobDomain';
import { IJobRepository } from './IJobRepository';
import { IJobService } from './IJobService';

@Injectable()
export class JobService implements IJobService {
  private jobRepositoryAdapter: IJobRepository;
  constructor(@Inject('IJobRepository') jobAdapter: IJobRepository) {
    this.jobRepositoryAdapter = jobAdapter;
  }

  save(job: JobDomain) {
    return this.jobRepositoryAdapter.save(job);
  }
  getAll() {
    return this.jobRepositoryAdapter.getAll();
  }
  getJob(jobId: number) {
    return this.jobRepositoryAdapter.getJob(jobId);
  }
  remove(jobId: number) {
    return this.jobRepositoryAdapter.remove(jobId);
  }
  update(jobId: number, job: JobDomain) {
    return this.jobRepositoryAdapter.update(jobId, job);
  }
}
