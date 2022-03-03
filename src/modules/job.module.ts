import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from '../domain/job/job.service';
import { JobController } from '../exposition/job/job.controller';
import { JobEntity } from '../infrastructure/job/job.entity';
import { JobAdapter } from '../infrastructure/job/job.repository.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  exports: [TypeOrmModule],
  providers: [JobService, { provide: 'JobRepository', useClass: JobAdapter }],
  controllers: [JobController],
})
export class JobModule {}
