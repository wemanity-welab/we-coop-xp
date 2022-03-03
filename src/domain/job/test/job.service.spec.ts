import { JobService } from '../job.service';
import mockedAdapter from './mock/mockedAdapter';
import mockedJobs from './mock/mockedJobs';

describe('should test job adapter class', () => {
  let jobService: JobService;

  beforeEach(() => {
    jobService = new JobService(mockedAdapter);
  });

  it('should return success', async () => {
    const job = await jobService.getJob(2);

    console.log(job);
    expect(job.getTitle).toBe(mockedJobs[2].getTitle);
  });
});
