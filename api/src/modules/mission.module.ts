import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionService } from '../domain/Mission/MissionService';
import { MissionController } from '../exposition/Mission/MissionController';
import { MissionServiceAdapter } from '../exposition/Mission/MissionServiceAdapter';
import { MissionEntity } from '../infrastructure/Mission/MissionEntity';
import { MissionRepositoryAdapter } from '../infrastructure/Mission/MissionRepositoryAdapter';

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
