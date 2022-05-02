import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperatorService } from '../domain/Cooperator/CooperatorService';
import { CooperatorController } from '../exposition/Cooperator/CooperatorController';
import { CooperatorServiceAdapter } from '../exposition/Cooperator/CooperatorServiceAdapter';
import { CooperatorEntity } from '../infrastructure/Cooperator/CooperatorEntity';
import { CooperatorRepositoryAdapter } from '../infrastructure/Cooperator/CooperatorRepositoryAdapter';

@Module({
  imports: [TypeOrmModule.forFeature([CooperatorEntity])],
  exports: [TypeOrmModule],
  controllers: [CooperatorController],
  providers: [
    CooperatorService,
    CooperatorServiceAdapter,
    { provide: 'ICooperatorRepository', useClass: CooperatorRepositoryAdapter },
    { provide: 'ICooperatorService', useClass: CooperatorService },
  ],
})
export class CooperatorModule {}
