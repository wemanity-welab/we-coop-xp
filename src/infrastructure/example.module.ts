import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleEntity } from '../domain/entities/example.entities';

@Module({
  imports: [TypeOrmModule.forFeature([ExampleEntity])],
  exports: [TypeOrmModule],
})
export class ExampleModule {}
