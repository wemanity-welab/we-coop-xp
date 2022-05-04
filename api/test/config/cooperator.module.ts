import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperatorService } from '../../src/domain/Cooperator/cooperator.service';
import { CooperatorController } from '../../src/exposition/Cooperator/cooperator.controller';
import { CooperatorServiceAdapter } from '../../src/exposition/Cooperator/cooperator.service.adapter';
import { CooperatorEntity } from '../../src/infrastructure/Cooperator/cooperator.entity';
import { CooperatorRepositoryAdapter } from '../../src/infrastructure/Cooperator/cooperator.repository.adapter';

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
