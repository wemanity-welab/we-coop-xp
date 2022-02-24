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

  public save(job: JobModel) {
    this.jobEntityRepository.save(job);

    return 'Success';
  }
  public getAll() {
    return this.jobEntityRepository.find();
  }
}
