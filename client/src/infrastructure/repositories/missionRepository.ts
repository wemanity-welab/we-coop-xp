import { Mission } from 'domain/models/Mission';
import { Http } from 'domain/repositories/Http';
import { MissionRepository as IMissionRepository } from 'domain/repositories/MissionRepository.interface';
import { MissionDTO } from 'infrastructure/http/MissionDTO';

export const missionRepository = (client: Http): IMissionRepository => ({
  getMissions: async () => {
    const missions = await client.get<MissionDTO[]>('/missions');
    return missions.map(
      (missionDto): Mission => ({
        id: missionDto.id,
        title: missionDto.title,
        profile: missionDto.profile,
        client: missionDto.client,
        description: missionDto.description,
        isActive: missionDto.isActive,
      }),
    );
  },
});
