import { JobDomain } from '../../job.domain';
import { JobRepository } from '../../job.repository';
import mockedEntity from './mockedEntity';

const mockedAdapter: JobRepository = {
  save: jest.fn(async (job: JobDomain): Promise<string> => {
    await mockedEntity.save(job);
    return 'success';
  }),
  getAll: jest.fn(async (): Promise<JobDomain[]> => {
    return await mockedEntity.find();
  }),
  remove: jest.fn(async (jobId: number): Promise<any> => {
    return await mockedEntity.delete(jobId);
  }),
  update: jest.fn(async (jobId: number, job: JobDomain): Promise<any> => {
    return await mockedEntity.update(jobId, job);
  }),
  getJob: jest.fn(async (jobId: number): Promise<JobDomain> => {
    const job = await mockedEntity.findOne(jobId);
    return job;
  }),
};

export default mockedAdapter;
