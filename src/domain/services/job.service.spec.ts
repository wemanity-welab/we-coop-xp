import { JobService } from './job.service';
import { JobModel } from '../models/job.model';
import { JobRepository } from '../interfaces/job.repository';
import { JobEntity } from '../entities/job.entities';
import { JobAdapter } from '../../infrastructure/job.repository.adapter';
import { job } from '../../../test/jobOffer';

const completeJobs = new JobModel(job);

describe('should create job Offer', () => {
  const jobAdapter = new JobAdapter(undefined);

  jobAdapter.save = (job: JobModel) => {
    return 'Success';
  };

  jobAdapter.getAll = (): Promise<JobEntity[]> => {
    throw new Error('Function not implemented.');
  };

  const jobService = new JobService(jobAdapter);

  it('Should send message successfully', () => {
    expect(jobService.create(completeJobs)).toBe('Success');
  });
});
