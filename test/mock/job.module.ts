import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from '../../src/domain/job/JobService';
import { JobController } from '../../src/exposition/job/JobController';
import { JobServiceAdapter } from '../../src/exposition/job/JobServiceAdapter';
import { JobRepositoryAdapter } from '../../src/infrastructure/job/JobRepositoryAdapter';
import { JobEntity } from './entity';

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
