import { Injectable } from '@nestjs/common';
import { JobAdapter } from '../../infrastructure/job.repository.adapter';
import { JobModel } from '../models/job.model';

@Injectable()
export class JobService {
  private jobRepositoryAdapter: JobAdapter;

  constructor(jobAdapter: JobAdapter) {
    this.jobRepositoryAdapter = jobAdapter;
  }

  create(job: JobModel) {
    return this.jobRepositoryAdapter.save(job);
  }
  getAll() {
    return this.jobRepositoryAdapter.getAll();
  }

  removeJob(jobId: number) {
    return this.jobRepositoryAdapter.remove(jobId);
  }
}
