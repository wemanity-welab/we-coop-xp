import { JobDomain } from '../../src/domain/job/JobDomain';
import mockedJobs from './mockedJobs';

const mockedEntityMethods = {
  save: jest.fn(async (job: JobDomain): Promise<JobDomain[]> => {
    mockedJobs.push(job);
    return mockedJobs;
  }),
  find: jest.fn(async (): Promise<JobDomain[]> => {
    return mockedJobs;
  }),
  findOne: jest.fn(async (id: number): Promise<JobDomain> => {
    return await mockedJobs.find((job) => job.id === id);
  }),
  delete: jest.fn(async (id: number): Promise<JobDomain[]> => {
    const jobId = id;
    const jobFound = await mockedJobs.find((job) => job.id === jobId);
    mockedJobs.splice(mockedJobs.indexOf(jobFound), 1);
    return mockedJobs;
  }),
  update: jest.fn(async (jobId: number, job: JobDomain): Promise<JobDomain> => {
    const jobFound = await mockedJobs.find((job) => job.id === jobId);
    const indexOfJobFound = mockedJobs.indexOf(jobFound);

    mockedJobs[indexOfJobFound].setTitle = job.getTitle;
    mockedJobs[indexOfJobFound].setAddress = job.getAddress;
    mockedJobs[indexOfJobFound].setSalary = job.getSalary;
    mockedJobs[indexOfJobFound].setContract_type = job.getContract_type;
    mockedJobs[indexOfJobFound].setAuthor = job.getAuthor;
    mockedJobs[indexOfJobFound].setDescription = job.getDescription;

    return mockedJobs[indexOfJobFound];
  }),
};

export default mockedEntityMethods;
