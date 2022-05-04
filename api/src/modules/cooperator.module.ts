import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperatorService } from '../domain/Cooperator/cooperator.service';
import { CooperatorController } from '../exposition/Cooperator/cooperator.controller';
import { CooperatorServiceAdapter } from '../exposition/Cooperator/cooperator.service.adapter';
import { CooperatorEntity } from '../infrastructure/Cooperator/cooperator.entity';
import { CooperatorRepositoryAdapter } from '../infrastructure/Cooperator/cooperator.repository.adapter';

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
