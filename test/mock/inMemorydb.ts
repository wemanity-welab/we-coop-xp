//import { createConnection } from 'typeorm';
import { createConnection } from 'typeorm';
import { JobEntity } from './entity';

export async function dbConnection() {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [JobEntity],
    synchronize: true,
    logging: false,
  });
}
