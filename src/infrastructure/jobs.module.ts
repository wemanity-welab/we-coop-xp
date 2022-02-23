import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsEntity } from '../domain/entities/jobs.entities';

@Module({
  imports: [TypeOrmModule.forFeature([JobsEntity])],
  exports: [TypeOrmModule],
})
export class JobsModule {}
