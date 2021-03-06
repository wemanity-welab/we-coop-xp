import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { MissionDomain } from '../../domain/Mission/mission.domain';
import { IMissionRepository } from '../../domain/Mission/mission.irepository';
import { MissionEntity } from './mission.entity';
import { fromDomainToEntity, fromEntityToDomain } from './mission.entity';
import Utils from '../../utils/Utils';

@Injectable()
export class MissionRepositoryAdapter implements IMissionRepository {
  constructor(
    @InjectRepository(MissionEntity)
    private readonly missionEntityRepository: Repository<MissionEntity>,
  ) {}

  public async save(mission: MissionDomain): Promise<MissionDomain> {
    const requestedMission = await this.missionEntityRepository.save(
      fromDomainToEntity(mission),
    );
    return fromEntityToDomain(requestedMission);
  }
  public async getAll(): Promise<MissionDomain[]> {
    const missions = await this.missionEntityRepository.find();
    return missions.map((mission) => fromEntityToDomain(mission));
  }
  public async getOne(missionId: string): Promise<MissionDomain> {
    const missionOne = await this.missionEntityRepository.find({
      id: missionId,
    });
    const mission = missionOne.map((mission) => fromEntityToDomain(mission));
    return mission[0];
  }
  public async remove(missionId: string): Promise<string> {
    await this.missionEntityRepository.delete(missionId);
    return `Mission n°${missionId} supprimée.`;
  }
  public async update(
    missionId: string,
    mission: Partial<MissionDomain>,
  ): Promise<MissionDomain> {
    const missionFound = await this.missionEntityRepository.findOne({
      id: missionId,
    });

    const missionUpdated = await this.missionEntityRepository.save({
      ...missionFound, // existing fields
      ...mission, // updated fields
    });
    return fromEntityToDomain(missionUpdated);
  }

  async search(keywords: string[]): Promise<MissionDomain[]> {
    const request = await this.searchByElement(keywords);

    const missions: MissionEntity[] = Utils.removeDuplicateObject(request);

    return missions.map((mission) => new MissionDomain(mission));
  }

  async searchByElement(array: Array<any>) {
    const elements: any[] = [];
    await Promise.all(
      array.map(async (element) => {
        const request: Array<string | number | object> =
          await this.missionEntityRepository
            .createQueryBuilder('mission')
            .where('LOWER(client) LIKE :client', {
              client: `%${element.toLowerCase()}%`,
            })
            .orWhere('LOWER(profile) LIKE :profile', {
              profile: `%${element.toLowerCase()}%`,
            })
            .orWhere('LOWER(description) LIKE :description', {
              description: `%${element.toLowerCase()}%`,
            })
            .getMany();
        request.forEach((req) => elements.push(req));
      }),
    );

    return elements;
  }
}
