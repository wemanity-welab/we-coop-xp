export interface MissionDTO {
  id?: string;
  title: string;
  profile: string;
  client: string;
  description: string;
  isActive?: boolean;
}

//EXEMPLE TYPE
type CreateMission = Omit<MissionDTO, 'id' | 'isActive'>;

type pickMission = Pick<MissionDTO, 'id' | 'isActive'>;

type Delete = Pick<MissionDTO, 'id'>;

type Update = Partial<MissionDTO>;

// EXEMPLE if property is possibly undefined;
// object.property?.childproperty;
// object && object.property;
// object.property!;
