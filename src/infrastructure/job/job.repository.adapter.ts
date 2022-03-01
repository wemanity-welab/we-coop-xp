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
    this.jobEntityRepository.save(JobEntity.fromDomainToEntity(job));
    return 'Success';
  }
  public async getAll(): Promise<JobDomain[]> {
    const jobs = await this.jobEntityRepository.find();
    return jobs.map((job) => JobEntity.fromEntityToDomain(job));
  }

  public async remove(jobId: number): Promise<string> {
    const job = await this.jobEntityRepository.findOne({ id: jobId });

    if (job) {
      await this.jobEntityRepository.delete(jobId);

      return 'Job was removed';
    }
    return 'Job not found';
  }
  public async update(jobId: number, job: JobDomain): Promise<string | void> {
    const jobFound = await this.jobEntityRepository.findOne({ id: jobId });

    if (jobFound) {
      await this.jobEntityRepository.update(
        +jobId,
        JobEntity.fromDomainToEntity(job),
      );
    } else {
      throw new Error('job not updated');
    }
  }
}
