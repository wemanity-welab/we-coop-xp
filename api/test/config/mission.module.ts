import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionService } from '../../src/domain/Mission/mission.service';
import { MissionController } from '../../src/exposition/Mission/mission.controller';
import { MissionServiceAdapter } from '../../src/exposition/Mission/mission.service.adapter';
import { MissionRepositoryAdapter } from '../../src/infrastructure/Mission/mission.repository.adapter';
import { MissionEntity } from '../../src/infrastructure/Mission/mission.entity';

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
