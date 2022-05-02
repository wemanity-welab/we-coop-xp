import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperatorService } from '../../src/domain/Cooperator/CooperatorService';
import { CooperatorController } from '../../src/exposition/Cooperator/CooperatorController';
import { CooperatorServiceAdapter } from '../../src/exposition/Cooperator/CooperatorServiceAdapter';
import { CooperatorEntity } from '../../src/infrastructure/Cooperator/CooperatorEntity';
import { CooperatorRepositoryAdapter } from '../../src/infrastructure/Cooperator/CooperatorRepositoryAdapter';

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
