import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// The property "name" sets the table name. This is usually implied from the
// class name, however this can be overridden if needed.
@Entity({ name: 'exampleTable' })
export class ExampleEntity {
  @PrimaryGeneratedColumn({ name: 'example_id' })
  id!: number;

  @Column({ name: 'description' })
  description!: string;
}
