import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JobDomain } from '../../domain/job/job.domain';
import { JobRepository } from '../../domain/job/job.repository';
import { JobEntity } from './job.entity';

@Injectable()
export class JobAdapter implements JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobEntityRepository: Repository<JobEntity>,
  ) {}

  public save(job: JobDomain): string {
    this.jobEntityRepository.save(job);

    return 'Success';
  }
  public async getAll(): Promise<JobDomain[]> {
    return await this.jobEntityRepository.find();
  }

  public async remove(jobId: number): Promise<string> {
    const job = await this.jobEntityRepository.findOne({ id: jobId });

    if (job) {
      await this.jobEntityRepository.delete(jobId);

      return 'Job was removed';
    }
    return 'Job not found';
  }
}
