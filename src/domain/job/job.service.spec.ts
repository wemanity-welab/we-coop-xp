import { JobService } from './job.service';
import { JobDomain } from './job.domain';
import { job } from '../../../test/jobOffer';
import { JobAdapter } from '../../infrastructure/job/job.repository.adapter';

// const completeJobs = new JobDomain(job);

// // class JobAdapterMock {
// //   create {

// //   }
// //   getall {

// //   }
// // }

//TODO MOCK create class jobAdapter

describe('should create job Offer', () => {
  const jobAdapter = new JobAdapter(undefined);

  jobAdapter.save = (job: JobDomain) => {
    return 'Success';
  };

  jobAdapter.getAll = (): Promise<JobDomain[]> => {
    throw new Error('Function not implemented.');
  };

  const jobService = new JobService(jobAdapter);

  it('Should send message successfully', () => {
    expect(jobService.create(completeJobs)).toBe('Success');
  });
});
