import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MissionDomain } from '../../domain/mission/MissionDomain';

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.

@Entity({ name: 'mission' })
export class MissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @ApiProperty()
  @Column({ name: 'titre de la mission' })
  title!: string;
  @ApiProperty()
  @Column({ name: 'client' })
  client!: string;
  @ApiProperty()
  @Column({ name: 'profil recherché' })
  profile!: string;
  @ApiProperty()
  @Column({ name: 'description' })
  description!: string;
  @ApiProperty()
  @Column({ type: 'boolean', name: 'isActive', default: false })
  isActive!: boolean;
}

export const fromDomainToEntity = (
  missionDomain: MissionDomain,
): MissionEntity => {
  const result = new MissionEntity();
  result.profile = missionDomain.getProfile;
  result.client = missionDomain.getClient;
  result.title = missionDomain.getTitle;

  result.description = missionDomain.getDescription;

  result.isActive = missionDomain.getStatus;
  return result;
};

export const fromEntityToDomain = (
  missionEntity: MissionEntity,
): MissionDomain => {
  return new MissionDomain(missionEntity);
};
