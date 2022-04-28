import { Mission } from './mission';

export interface IMissionRepository {
  getMissions: () => Promise<Mission[]>;
}
