import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MissionDomain } from '../../src/domain/mission/MissionDomain';

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.

@Entity({ name: 'missionTable' })
export class MissionEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'address' })
  address!: string;

  @Column({ name: 'salary' })
  salary!: string;

  @Column({ name: 'contract_type' })
  contract_type!: string;

  @Column({ name: 'author' })
  author!: string;

  @Column({ name: 'description' })
  description!: string;
}

export const fromDomainToEntity = (missionDomain: MissionDomain): any => {
  return { ...missionDomain };
};

export const fromEntityToDomain = (
  missionEntity: MissionEntity,
): MissionDomain => {
  return new MissionDomain(missionEntity);
};
