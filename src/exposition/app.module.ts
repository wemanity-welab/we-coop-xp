import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from '../domain/services/app.service';
import { JobController } from './job.controller';
import { JobService } from '../domain/services/job.service';
import { JobEntity } from '../domain/entities/job.entities';
import { JobAdapter } from '../infrastructure/job.repository.adapter';
import { JobModule } from '../infrastructure/job.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [JobEntity],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    JobModule,
  ],
  controllers: [AppController, JobController],
  providers: [AppService, JobService, JobAdapter],
})
export class AppModule {}
