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

  async save(job: JobDomain) {
    return await this.jobRepositoryAdapter.save(job);
  }
  async getAll() {
    return await this.jobRepositoryAdapter.getAll();
  }
  async getJob(jobId: number) {
    return await this.jobRepositoryAdapter.getJob(jobId);
  }
  async remove(jobId: number) {
    return await this.jobRepositoryAdapter.remove(jobId);
  }
  async update(jobId: number, job: JobDomain) {
    return await this.jobRepositoryAdapter.update(jobId, job);
  }
}
