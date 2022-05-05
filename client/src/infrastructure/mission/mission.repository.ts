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
    console.log('postMission', postMission);

    return postMission;
  },

  missionfiltred: async (keywords: string[]) => {
    console.log('keywords', keywords);

    // let url = '/missions/search/?';
    // let words = '';
    // keywords.map(async key => {
    //   words = await (words + `criteria=${key}&`);
    // });
    // url = url + words;
    // console.log('url', url);

    const parameterizeArray = (key, arr) => {
      arr = arr.map(encodeURIComponent);
      return '?' + 'criteria=' + arr.join('&' + key + '=');
    };

    const missionfiltred = await client.get<MissionDTO[]>(
      '/missions/search/' + parameterizeArray('criteria', keywords),
    );

    return missionfiltred.map(
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
