import { JobDomain } from '../../job.domain';
import { JobRepository } from '../../job.repository';
import mockedEntity from './mockedEntity';

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
  getJob: async function (jobId: number): Promise<JobDomain> {
    const job = await mockedEntity.findOne(jobId);
    return job;
  },
};

export default mockedAdapter;
