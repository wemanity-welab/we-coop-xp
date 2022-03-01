import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAdapter } from './job/job.repository.adapter';
import { JobEntity } from './job/job.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { JobDomain } from '../domain/job/job.domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configuration,
    }),
  ],
  providers: [JobAdapter, JobEntity, JobDomain],
  exports: [],
})
export class RepositoriesModule {}
