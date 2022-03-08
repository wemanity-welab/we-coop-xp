import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JobDomain } from '../../domain/job/JobDomain';
import { IJobRepository } from '../../domain/job/IJobRepository';
import { JobEntity } from './JobEntity';
import { fromDomainToEntity, fromEntityToDomain } from './JobEntity';

@Injectable()
export class JobRepositoryAdapter implements IJobRepository {
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
    try {
      const removeReturn = await this.jobEntityRepository.delete(jobId);
      return removeReturn.affected === 0 ? 'Job not found' : 'Job deleted';
    } catch (error) {
      throw new Error(error);
    }
  }
  public async update(jobId: number, job: any): Promise<any> {
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
