import { Mission } from '../models/Mission';

export interface MissionRepository {
  getMissions: () => Promise<Mission[]>;
}