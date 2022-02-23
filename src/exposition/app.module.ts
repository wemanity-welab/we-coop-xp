import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from '../domain/services/app.service';
import { JobsController } from './jobs.controller';
import { JobsService } from '../domain/services/jobs.service';
import { JobsEntity } from '../domain/entities/jobs.entities';
import { JobsAdapter } from '../infrastructure/jobs.repository.adapter';
import { JobsModule } from '../infrastructure/jobs.module';
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
      entities: [JobsEntity],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    JobsModule,
  ],
  controllers: [AppController, JobsController],
  providers: [AppService, JobsService, JobsAdapter],
})
export class AppModule {}
