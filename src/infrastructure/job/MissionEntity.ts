import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MissionDomain } from '../../domain/mission/MissionDomain';

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.

@Entity({ name: 'missionTable' })
export class MissionEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;
  @ApiProperty()
  @Column({ name: 'title' })
  title!: string;
  @ApiProperty()
  @Column({ name: 'address' })
  address!: string;
  @ApiProperty()
  @Column({ name: 'salary' })
  salary!: string;
  @ApiProperty()
  @Column({ name: 'contract_type' })
  contract_type!: string;
  @ApiProperty()
  @Column({ name: 'author' })
  author!: string;
  @ApiProperty()
  @Column({ name: 'description' })
  description!: string;
  @ApiProperty()
  @Column({ name: 'created_at', nullable: true })
  created_at!: string;
  @ApiProperty()
  @Column({ name: 'updated_at', nullable: true })
  updated_at!: string;
}

export const fromDomainToEntity = (missionDomain: MissionDomain): any => {
  return { ...missionDomain };
};

export const fromEntityToDomain = (
  missionEntity: MissionEntity,
): MissionDomain => {
  return new MissionDomain(missionEntity);
};
