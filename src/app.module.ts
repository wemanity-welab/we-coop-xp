import { Module } from '@nestjs/common';

import { JobController } from './exposition/job/job.controller';
import { JobService } from './domain/job/job.service';
import { JobAdapter } from './infrastructure/job/job.repository.adapter';
import { JobModule } from './infrastructure/job/job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { RepositoriesModule } from './infrastructure/repositories.module';
import { JobDomain } from './domain/job/job.domain';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RepositoriesModule,
    JobModule,
  ],
})
export class AppModule {}
