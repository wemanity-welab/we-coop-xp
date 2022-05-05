import { Mission } from 'domain/mission/mission';
import { IMissionRepository } from 'domain/mission/mission.irepository';
import { MissionDTO } from './mission.dto';
import { Http } from 'infrastructure/util/Http';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line react-hooks/rules-of-hooks

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

    return postMission;
  },

  missionFiltred: async (keywords: string[]) => {
    console.log('keywords', keywords);

    const parameterizeArray = (key, arr) => {
      arr = arr.map(encodeURIComponent);
      return '?' + 'criteria=' + arr.join('&' + key + '=');
    };
    const url = '/missions/search/' + parameterizeArray('criteria', keywords);
    console.log('url :', url);

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
