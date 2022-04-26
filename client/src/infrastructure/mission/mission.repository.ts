import { Mission } from 'domain/mission/mission';
import { IMissionRepository } from 'domain/mission/mission.irepository';
import { MissionDTO } from './mission.dto';
import { Http } from 'infrastructure/util/Http';

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

  addMission: async (mission: Mission) => {
    const postMission = await client.post<MissionDTO>('/missions', mission);
    console.log('postMission');

    return postMission.push(
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
