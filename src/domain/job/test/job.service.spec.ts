import { JobDomain } from '../job.domain';
import { JobService } from '../job.service';
import mockedAdapter from './mock/mockedAdapter';
import mockedJobs from './mock/mockedJobs';

describe('should test jobService class', () => {
  let jobService: JobService;

  beforeEach(() => {
    jobService = new JobService(mockedAdapter);
  });

  it('should return success', async () => {
    const job: JobDomain = new JobDomain({
      title: 'dev web',
      address: '6 Rue de Paris',
      salary: '2k',
      contract_type: 'CDD',
      author: 'Adecco',
      description: 'Post',
    });

    expect(await jobService.create(job)).toBe('success');
  });
});
