import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from '../domain/services/app.service';
import { ExampleController } from './example.controller';
import { ExampleService } from '../domain/services/example.service';
import { ExampleEntity } from '../domain/entities/example.entities';
import { ExampleAdapter } from '../infrastructure/example.repository.adapter';
import { ExampleModule } from '../infrastructure/example.module';
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
      entities: [ExampleEntity],
      synchronize: true,
    }),
    ExampleModule,
  ],
  controllers: [AppController, ExampleController],
  providers: [
    AppService,
    ExampleService,
    ExampleAdapter,
  ],
})
export class AppModule {}
