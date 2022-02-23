import { Injectable } from '@nestjs/common';
import { JobsAdapter } from '../../infrastructure/jobs.repository.adapter';
import { JobsModel } from '../models/jobs.model';

@Injectable()
export class JobsService {
  private jobsRepositoryAdapter: JobsAdapter;

  constructor(jobsAdapter: JobsAdapter) {
    this.jobsRepositoryAdapter = jobsAdapter;
  }

  create(job: JobsModel) {
    return this.jobsRepositoryAdapter.save(job);
  }
  getAll() {
    return this.jobsRepositoryAdapter.getAll();
  }
}
