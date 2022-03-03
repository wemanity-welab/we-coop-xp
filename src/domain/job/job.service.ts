import { Inject, Injectable } from '@nestjs/common';
import { JobDomain } from './job.domain';
import { JobRepository } from './job.repository';

@Injectable()
export class JobService {
  private jobRepositoryAdapter: JobRepository;
  constructor(@Inject('JobRepository') jobAdapter: JobRepository) {
    this.jobRepositoryAdapter = jobAdapter;
  }

  create(job: JobDomain) {
    return this.jobRepositoryAdapter.save(job);
  }
  getAll() {
    return this.jobRepositoryAdapter.getAll();
  }
  getJob(jobId: number) {
    return this.jobRepositoryAdapter.getJob(jobId);
  }
  removeJob(jobId: number) {
    return this.jobRepositoryAdapter.remove(jobId);
  }
  updateJob(jobId: number, job: JobDomain) {
    return this.jobRepositoryAdapter.update(jobId, job);
  }
}
