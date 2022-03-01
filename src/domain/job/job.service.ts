import { Injectable } from '@nestjs/common';
import { JobAdapter } from '../../infrastructure/job/job.repository.adapter';
import { JobDomain } from './job.domain';

@Injectable()
export class JobService {
  private jobRepositoryAdapter: JobAdapter;

  constructor(jobAdapter: JobAdapter) {
    this.jobRepositoryAdapter = jobAdapter;
  }

  create(job: JobDomain) {
    return this.jobRepositoryAdapter.save(job);
  }
  getAll() {
    return this.jobRepositoryAdapter.getAll();
  }

  removeJob(jobId: number) {
    return this.jobRepositoryAdapter.remove(jobId);
  }
  updateJob(jobId: number, job: JobDomain) {
    return this.jobRepositoryAdapter.update(jobId, job);
  }
}
