import { JobDomain } from '../../job.domain';
import mockedJobs from './mockedJobs';

const mockedEntity = {
  save: jest.fn(async (job: JobDomain): Promise<JobDomain[]> => {
    await mockedJobs.push(job);
    return mockedJobs;
  }),
  find: jest.fn(async (): Promise<JobDomain[]> => {
    const jobs = await mockedJobs;
    return jobs;
  }),
  findOne: jest.fn(async (id: number): Promise<JobDomain> => {
    const jobId: number = id;
    const job = await mockedJobs.find((job) => job.id === jobId);
    return job;
  }),
  delete: jest.fn(async (id: number): Promise<JobDomain[]> => {
    const jobId = id;
    const jobFound = await mockedJobs.find((job) => job.id === jobId);
    await mockedJobs.splice(mockedJobs.indexOf(jobFound), 1);
    return mockedJobs;
  }),
  update: jest.fn(async (jobId: number, job: JobDomain) => {
    const jobFound = mockedJobs.find((job) => job.id === jobId);
    const indexOfJobFound = mockedJobs.indexOf(jobFound);

    mockedJobs[indexOfJobFound].setTitle = job.getTitle;
    mockedJobs[indexOfJobFound].setAddress = job.getAddress;
    mockedJobs[indexOfJobFound].setSalary = job.getSalary;
    mockedJobs[indexOfJobFound].setContract_type = job.getContract_type;
    mockedJobs[indexOfJobFound].setAuthor = job.getAuthor;
    mockedJobs[indexOfJobFound].setDescription = job.getDescription;

    return mockedJobs;
  }),
};

export default mockedEntity;
