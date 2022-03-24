import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionService } from '../../src/domain/mission/MissionService';
import { MissionController } from '../../src/exposition/job/MissionController';
import { MissionServiceAdapter } from '../../src/exposition/job/MissionServiceAdapter';
import { MissionRepositoryAdapter } from '../../src/infrastructure/job/MissionRepositoryAdapter';
import { MissionEntity } from './missionEntityMock';

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
