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
  updateMission: async (id, data) => {
    const missionUpdated = await client.patch<MissionDTO>(
      `/missions/${id}`,
      data,
    );
    return missionUpdated;
  },
  deleteMission: async id => {
    const missionDeleted = await client.delete<String>(`/missions/${id}`);
    return missionDeleted;
  },
  addMission: async (mission: Mission) => {
    const postMission = await client.post<MissionDTO>('/missions', mission);

    return postMission;
  },

  missionFiltred: async (keywords: string[]) => {
    const parameterizeArray = (key, arr) => {
      arr = arr.map(encodeURIComponent);
      return '?' + 'criteria=' + arr.join('&' + key + '=');
    };
    const url = '/missions/search/' + parameterizeArray('criteria', keywords);
    console.log('url', url);

    const missionFiltred = await client.get<MissionDTO[]>(url);

    return missionFiltred.map(
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
