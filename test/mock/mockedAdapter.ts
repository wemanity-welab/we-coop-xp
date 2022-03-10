import { IJobRepository } from '../../src/domain/job/IJobRepository';
import { JobDomain } from '../../src/domain/job/JobDomain';
import mockedJobs from './mockedJobs';

// const mockedAdapter: IJobRepository = {
//   save: jest.fn(async (job: JobDomain): Promise<string> => {
//     mockedJobs.push(job);
//     return 'Job offer created successfully';
//   }),
//   getAll: jest.fn(async (): Promise<JobDomain[]> => {
//     return mockedJobs;
//   }),
//   getJob: jest.fn(async (id: number): Promise<JobDomain> => {
//     return await mockedJobs.find((job) => job.id === id);
//   }),
//   remove: jest.fn(async (id: number): Promise<string> => {
//     const jobId = id;
//     const jobFound = await mockedJobs.find((job) => job.id === jobId);
//     mockedJobs.splice(mockedJobs.indexOf(jobFound), 1);
//     return 'Job offer removed';
//   }),
//   update: jest.fn(async (jobId: number, job: JobDomain): Promise<JobDomain> => {
//     const jobFound = await mockedJobs.find((job) => job.id === jobId);
//     const indexOfJobFound = mockedJobs.indexOf(jobFound);

//     mockedJobs[indexOfJobFound].setTitle = job.getTitle;
//     mockedJobs[indexOfJobFound].setAddress = job.getAddress;
//     mockedJobs[indexOfJobFound].setSalary = job.getSalary;
//     mockedJobs[indexOfJobFound].setContract_type = job.getContract_type;
//     mockedJobs[indexOfJobFound].setAuthor = job.getAuthor;
//     mockedJobs[indexOfJobFound].setDescription = job.getDescription;

//     return mockedJobs[indexOfJobFound];
//   }),
// };

const mockedAdapter: IJobRepository = {
  save: async (job: JobDomain): Promise<string> => {
    mockedJobs.push(job);
    return await 'Job offer created successfully';
  },
  getAll: async (): Promise<JobDomain[]> => {
    return mockedJobs;
  },
  getJob: async (id: number): Promise<JobDomain> => {
    return await mockedJobs.find((job) => job.id === id);
  },
  remove: async (id: number): Promise<string> => {
    const jobId = id;
    const jobFound = await mockedJobs.find((job) => job.id === jobId);
    mockedJobs.splice(mockedJobs.indexOf(jobFound), 1);
    return await 'Job offer removed';
  },
  update: async (jobId: number, job: JobDomain): Promise<JobDomain> => {
    const jobFound = await mockedJobs.find((job) => job.id === jobId);
    const indexOfJobFound = mockedJobs.indexOf(jobFound);

    mockedJobs[indexOfJobFound].setTitle = job.getTitle;
    mockedJobs[indexOfJobFound].setAddress = job.getAddress;
    mockedJobs[indexOfJobFound].setSalary = job.getSalary;
    mockedJobs[indexOfJobFound].setContract_type = job.getContract_type;
    mockedJobs[indexOfJobFound].setAuthor = job.getAuthor;
    mockedJobs[indexOfJobFound].setDescription = job.getDescription;

    return mockedJobs[indexOfJobFound];
  },
};

export default mockedAdapter;
