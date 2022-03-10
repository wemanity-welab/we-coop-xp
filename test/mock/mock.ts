// import { JobDomain } from '../../src/domain/job/JobDomain';
// import { IJobRepository } from '../../src/domain/job/IJobRepository';
// import mockedEntityMethods from './mockedAdapter';

// const mock: IJobRepository = {
//   save: jest.fn(async (job: JobDomain): Promise<string> => {
//     await mockedEntityMethods.save(job);
//     return 'Job offer created successfully';
//   }),
//   getAll: jest.fn(async (): Promise<JobDomain[]> => {
//     return await mockedEntityMethods.find();
//   }),
//   remove: jest.fn(async (jobId: number): Promise<string> => {
//     await mockedEntityMethods.delete(jobId);
//     return 'Job offer removed';
//   }),
//   update: jest.fn(async (jobId: number, job: JobDomain): Promise<JobDomain> => {
//     return await mockedEntityMethods.update(jobId, job);
//   }),
//   getJob: jest.fn(async (jobId: number): Promise<JobDomain> => {
//     const job = await mockedEntityMethods.findOne(jobId);
//     return job;
//   }),
// };

// export default mock;
