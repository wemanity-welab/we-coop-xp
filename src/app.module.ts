import { Module } from '@nestjs/common';

import { JobModule } from './infrastructure/job/job.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from './infrastructure/job/job.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: configuration,
    }),
    JobModule,
  ],
})
export class AppModule {}
