import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleAdapter } from './example.repository.adapter';
import { ExampleEntity } from '../domain/entities/example.entities';

@Module({
  imports: [TypeOrmModule.forFeature([ExampleEntity])],
  providers: [ExampleAdapter],
  exports: [ExampleEntity],
})
export class RepositoriesModule {}