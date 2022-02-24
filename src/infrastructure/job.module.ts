import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../domain/entities/job.entities';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  exports: [TypeOrmModule],
})
export class JobModule {}
