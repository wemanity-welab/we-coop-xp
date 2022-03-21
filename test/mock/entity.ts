import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobDomain } from '../../src/domain/job/JobDomain';

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.

@Entity({ name: 'jobTable' })
export class JobEntity {
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

export const fromDomainToEntity = (jobDomain: JobDomain): any => {
  return { ...jobDomain };
};

export const fromEntityToDomain = (jobEntity: JobEntity): JobDomain => {
  return new JobDomain(jobEntity);
};
