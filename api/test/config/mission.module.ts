import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionService } from '../../src/domain/Mission/MissionService';
import { MissionController } from '../../src/exposition/Mission/MissionController';
import { MissionServiceAdapter } from '../../src/exposition/Mission/MissionServiceAdapter';
import { MissionRepositoryAdapter } from '../../src/infrastructure/Mission/MissionRepositoryAdapter';
import { MissionEntity } from '../../src/infrastructure/Mission/MissionEntity';

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
