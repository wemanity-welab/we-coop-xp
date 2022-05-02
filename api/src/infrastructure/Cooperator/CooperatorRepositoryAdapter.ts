import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CooperatorDomain } from '../../domain/Cooperator/CooperatorDomain';
import { ICooperatorRepository } from '../../domain/Cooperator/ICooperatorRepository';
import Utils from '../../utils/Utils';
import {
  CooperatorEntity,
  fromDomainToEntity,
  fromEntityToDomain,
} from './CooperatorEntity';

@Injectable()
export class CooperatorRepositoryAdapter implements ICooperatorRepository {
  constructor(
    @InjectRepository(CooperatorEntity)
    private readonly cooperatorEntityRepository: Repository<CooperatorEntity>,
  ) {}

  async save(cooperator: CooperatorDomain): Promise<CooperatorDomain> {
    const entityConvertedCooperator = fromDomainToEntity(cooperator);
    const savedCooperator = await this.cooperatorEntityRepository.save(
      entityConvertedCooperator,
    );
    const domainConvertedCooperator = fromEntityToDomain(savedCooperator);
    return domainConvertedCooperator;
  }

  async getAll(): Promise<CooperatorDomain[]> {
    const cooperatorsList = await this.cooperatorEntityRepository.find();
    const domainConvertedList = cooperatorsList.map(
      (cooperator) => new CooperatorDomain(cooperator),
    );
    return domainConvertedList;
  }

  async remove(id: string): Promise<string> {
    await this.cooperatorEntityRepository.delete(id);
    return `Cooperateur n°${id} supprimée.`;
  }

  async update(
    id: string,
    cooperator: Partial<CooperatorDomain>,
  ): Promise<CooperatorDomain> {
    const cooperatorFound = await this.cooperatorEntityRepository.findOne({
      id,
    });
    const cooperatorUpdated = await this.cooperatorEntityRepository.save({
      ...cooperatorFound,
      ...cooperator,
    });
    const domainConvertedCooperator = fromEntityToDomain(cooperatorUpdated);
    return domainConvertedCooperator;
  }

  async getOne(id: string): Promise<any> {
    const cooperatorFound = await this.cooperatorEntityRepository.findOne({
      id,
    });
    const domainConvertedCooperator = fromEntityToDomain(cooperatorFound);
    return domainConvertedCooperator;
  }

  async search(keywords: string[]): Promise<CooperatorDomain[]> {
    const request = await this.searchByElement(keywords);

    const cooperators: CooperatorEntity[] =
      Utils.removeDuplicateObject(request);

    return cooperators.map((cooperator) => new CooperatorDomain(cooperator));
  }

  async searchByElement(array: Array<any>) {
    const elements: any[] = [];
    await Promise.all(
      array.map(async (element) => {
        const request: Array<string | number | object> =
          await this.cooperatorEntityRepository.find({
            where: [
              { firstName: Like(`%${element}%`) },
              { lastName: Like(`%${element}%`) },
              { email: Like(`%${element}%`) },
              { practice: Like(`%${element}%`) },
            ],
          });
        request.forEach((req) => elements.push(req));
      }),
    );

    return elements;
  }
}
