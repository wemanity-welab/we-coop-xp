import { JobsService } from './jobs.service';
import { JobsModel } from '../models/jobs.model';
import { JobsRepository } from '../interfaces/jobs.repository';
import { JobsEntity } from '../entities/jobs.entities';
import { JobsAdapter } from '../../infrastructure/jobs.repository.adapter';
import { job } from '../../../test/jobOffer';

const completeJobs = new JobsModel(job);

describe('should create job Offer', () => {
  const jobsAdapter = new JobsAdapter(undefined);

  jobsAdapter.save = (job: JobsModel) => {
    return 'Success';
  };

  jobsAdapter.getAll = (): Promise<JobsEntity[]> => {
    throw new Error('Function not implemented.');
  };

  const jobsService = new JobsService(jobsAdapter);

  it('Should send message successfully', () => {
    expect(jobsService.create(completeJobs)).toBe('Success');
  });
});
