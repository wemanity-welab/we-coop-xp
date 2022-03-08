// import { getConnection } from 'typeorm';
import { JobService } from '../../src/domain/job/JobService';
import { dbConnection } from '../mock/inMemorydb';
// import mockedAdapter from '../mock/mockedAdapter';
// import { testDatasetSeed } from '../mock/mockedJobs';

describe('should test jobService class', () => {
  let jobService: JobService;

  beforeEach(async () => {
    await dbConnection();
    // await testDatasetSeed();
  });

  it('should return success', async () => {
    // const test = await jobService.getAll();
    // console.log(test);
    // const job: JobDomain = new JobDomain({
    //   title: 'dev web',
    //   address: '6 Rue de Paris',
    //   salary: '2k',
    //   contract_type: 'CDD',
    //   author: 'Adecco',
    //   description: 'Post',
    // });
    // const test = await jobService.create(job);
    // console.log(test);
    // expect(await jobService.create(job)).toBe('Job offer created successfully');
  });
});
