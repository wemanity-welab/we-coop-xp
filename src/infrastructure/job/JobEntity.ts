import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobDomain } from '../../domain/job/JobDomain';

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.

@Entity({ name: 'jobTable' })
export class JobEntity {
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
  @ApiProperty({ required: false })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at!: Date;
  @ApiProperty({ required: false })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at!: Date;
}

export const fromDomainToEntity = (jobDomain: JobDomain): any => {
  return { ...jobDomain };
};

export const fromEntityToDomain = (jobEntity: JobEntity): JobDomain => {
  return new JobDomain(jobEntity);
};
