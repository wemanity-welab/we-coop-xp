import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from '../domain/job/JobService';
import { JobController } from '../exposition/job/JobController';
import { JobServiceAdapter } from '../exposition/job/JobServiceAdapter';
import { JobEntity } from '../infrastructure/job/JobEntity';
import { JobRepositoryAdapter } from '../infrastructure/job/JobRepositoryAdapter';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  exports: [TypeOrmModule],
  controllers: [JobController],
  providers: [
    JobService,
    JobServiceAdapter,
    { provide: 'IJobRepository', useClass: JobRepositoryAdapter },
    { provide: 'IJobService', useClass: JobService },
  ],
})
export class JobModule {}
