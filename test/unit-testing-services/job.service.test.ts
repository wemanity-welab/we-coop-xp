// import { getConnection } from 'typeorm';
import { JobDomain } from '../../src/domain/job/JobDomain';
import { JobService } from '../../src/domain/job/JobService';
import Mock from '../mock/mockedAdapter';
// import mockedAdapter from '../mock/mockedAdapter';
// import { testDatasetSeed } from '../mock/mockedJobs';
const job = new JobDomain({
  id: 1,
  title: 'pouet',
  address: 'address',
  salary: 'salary',
  contract_type: 'contract_type',
  author: 'author',
  description: 'description',
});

describe('should test jobService class', () => {
  let jobService: JobService;
  let adapter: any;

  beforeAll(async () => {
    adapter = new Mock();
    jobService = new JobService(adapter);
  });

  it('should return success', async () => {
    expect(await jobService.save(job)).toBe('Success');
  });

  it('should update an object ', async () => {
    const newjob = new JobDomain({
      id: 1,
      title: 'test',
      address: 'address',
      salary: 'salary',
      contract_type: 'contract_type',
      author: 'author',
      description: 'description',
    });
    const resp = await jobService.update(1, newjob);
    console.log(`NEWJOB :`, newjob);
    console.log(`RESPONSE :`, resp);
    console.log(`JOB:`, job);
    console.log(await jobService.getAll());

    expect(resp).toEqual(newjob);
  });
});
