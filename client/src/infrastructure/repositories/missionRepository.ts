import { Mission } from 'domain/models/Mission';
import { Http } from 'domain/repositories/Http';
import { MissionRepository } from 'domain/repositories/MissionRepository';
import { MissionDTO } from 'infrastructure/http/MissionDTO';

export const missionRepository = (client: Http): MissionRepository => ({
  getMissions: async () => {
    const missions = await client.get<MissionDTO>('');
    return missions.map(
      (missionDto): Mission => ({
        id: missionDto.id,
        profile: missionDto.profile,
        client: missionDto.client,
        address: missionDto.address,
        project: missionDto.project,
        duration: missionDto.duration,
        description: missionDto.description,
        stack: missionDto.stack,
        teamOrganisation: missionDto.teamOrganisation,
        isActive: missionDto.isActive,
      }),
    );
  },
});
