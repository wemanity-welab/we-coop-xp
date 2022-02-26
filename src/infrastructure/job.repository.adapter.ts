import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JobModel } from '../domain/models/job.model';
import { JobRepository } from '../domain/interfaces/job.repository';
import { JobEntity } from '../domain/entities/job.entities';

@Injectable()
export class JobAdapter implements JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobEntityRepository: Repository<JobEntity>,
  ) {}

  public async save(job: JobModel): Promise<string> {
    await this.jobEntityRepository.save(job);

    return 'Success';
  }
  public getAll() {
    return this.jobEntityRepository.find();
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
