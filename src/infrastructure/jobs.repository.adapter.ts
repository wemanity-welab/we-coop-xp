import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JobsModel } from '../domain/models/jobs.model';
import { JobsRepository } from '../domain/interfaces/jobs.repository';
import { JobsEntity } from '../domain/entities/jobs.entities';

@Injectable()
export class JobsAdapter implements JobsRepository {
  constructor(
    @InjectRepository(JobsEntity)
    private readonly jobsEntityRepository: Repository<JobsEntity>,
  ) {}

  public save(job: JobsModel) {
    this.jobsEntityRepository.save(job);

    return 'Success';
  }
  public getAll() {
    return this.jobsEntityRepository.find();
  }
}
