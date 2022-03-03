import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JobDomain } from '../../domain/job/job.domain';
import { JobRepository } from '../../domain/job/job.repository';
import { JobEntity } from './job.entity';
import { fromDomainToEntity, fromEntityToDomain } from './job.entity';

@Injectable()
export class JobAdapter implements JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobEntityRepository: Repository<JobEntity>,
  ) {}

  public async save(job: JobDomain): Promise<string> {
    await this.jobEntityRepository.save(fromDomainToEntity(job));
    return 'Success';
  }
  public async getAll(): Promise<JobDomain[]> {
    const jobs = await this.jobEntityRepository.find();
    return jobs.map((job) => fromEntityToDomain(job));
  }
  public async getJob(jobId: number): Promise<JobDomain> {
    const jobOne = await this.jobEntityRepository.find({ id: jobId });
    const job = jobOne.map((job) => fromEntityToDomain(job));
    return job[0];
  }
  public async remove(jobId: number): Promise<string> {
    const job = await this.jobEntityRepository.findOne({ id: jobId });

    if (job) {
      await this.jobEntityRepository.delete(jobId);

      return 'Job was removed';
    }
    return 'Job not found';
  }
  public async update(jobId: number, job: JobDomain): Promise<JobDomain> {
    const jobFound = await this.jobEntityRepository.findOne({ id: jobId });

    if (jobFound) {
      const fetchedJob = await this.jobEntityRepository.save({
        ...jobFound, // existing fields
        ...job, // updated fields
      });
      return fromEntityToDomain(fetchedJob);
    } else {
      throw new Error('job not updated');
    }
  }
}
