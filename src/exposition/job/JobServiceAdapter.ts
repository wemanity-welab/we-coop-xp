import { Injectable } from '@nestjs/common';
import { JobDomain } from '../../domain/job/JobDomain';
import { JobService } from '../../domain/job/JobService';

@Injectable()
export class JobServiceAdapter {
  private JobService: JobService;
  constructor(JobService: JobService) {
    this.JobService = JobService;
  }

  public async save(job: JobDomain): Promise<string> {
    return this.JobService.save(job);
  }
  public async getAll(): Promise<JobDomain[]> {
    return this.JobService.getAll();
  }
  public async getJob(jobId: number): Promise<JobDomain> {
    return this.JobService.getJob(jobId);
  }
  public async remove(jobId: number): Promise<string> {
    return this.JobService.remove(jobId);
  }
  public async update(jobId: number, job: JobDomain): Promise<JobDomain> {
    return this.JobService.update(jobId, job);
  }
}
