import { CooperatorDomain } from '../../domain/Cooperator/cooperator.domain';

export interface CooperatorDTO {
  id?: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  practice: string;
  m3?: string;
  mentor?: string;
}

//EXEMPLE TYPE
// export type CreateCooperatorDTO = Omit<CooperatorDomain>;
export type UpdateCooperatorDTO = Partial<CooperatorDomain>;

// type pickMission = Pick<MissionDTO, 'id' | 'isActive'>;

// type Delete = Pick<MissionDTO, 'id'>;

// type Update = Partial<MissionDTO>;

// EXEMPLE if property is possibly undefined;
// object.property?.childproperty;
// object && object.property;
// object.property!;
