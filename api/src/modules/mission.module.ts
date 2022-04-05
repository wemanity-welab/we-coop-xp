import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionService } from '../domain/mission/MissionService';
import { MissionController } from '../exposition/job/MissionController';
import { MissionServiceAdapter } from '../exposition/job/MissionServiceAdapter';
import { MissionEntity } from '../infrastructure/job/MissionEntity';
import { MissionRepositoryAdapter } from '../infrastructure/job/MissionRepositoryAdapter';

@Module({
  imports: [TypeOrmModule.forFeature([MissionEntity])],
  exports: [TypeOrmModule],
  controllers: [MissionController],
  providers: [
    MissionService,
    MissionServiceAdapter,
    { provide: 'IMissionRepository', useClass: MissionRepositoryAdapter },
    { provide: 'IMissionService', useClass: MissionService },
  ],
})
export class MissionModule {}
