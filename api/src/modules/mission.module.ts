import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionService } from '../domain/Mission/mission.service';
import { MissionController } from '../exposition/Mission/mission.controller';
import { MissionServiceAdapter } from '../exposition/Mission/mission.service.adapter';
import { MissionEntity } from '../infrastructure/Mission/mission.entity';
import { MissionRepositoryAdapter } from '../infrastructure/Mission/mission.repository.adapter';

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
