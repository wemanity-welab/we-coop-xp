import { JobDomain } from '../job.domain';
import { Test, TestingModule } from '@nestjs/testing';
import { JobRepository } from '../job.repository';
import { JobEntity } from '../../../infrastructure/job/job.entity';
import { JobService } from '../job.service';
import { JobAdapter } from '../../../infrastructure/job/job.repository.adapter';

describe('should test job adapter class', () => {
  let jobService: JobService;
  const job = new JobDomain({
    id: 1,
    title: '',
    address: '',
    salary: '',
    contract_type: '',
    author: '',
    description: '',
  });
  const mockedAdapter: JobRepository = {
    save: jest.fn((job: JobDomain) => 'success'),
    getAll: function (): Promise<JobDomain[]> {
      throw new Error('Function not implemented.');
    },
    remove: function (jobId: number): Promise<string> {
      throw new Error('Function not implemented.');
    },
    update: function (jobId: number, job: JobDomain): Promise<JobDomain> {
      throw new Error('Function not implemented.');
    },
    getJob: function (jobId: number): Promise<JobDomain> {
      throw new Error('Function not implemented.');
    },
  };

  beforeEach(() => {
    jobService = new JobService(mockedAdapter);
  });

  it('should return success', () => {
    expect(jobService.create(job)).toBe('success');
  });
});
