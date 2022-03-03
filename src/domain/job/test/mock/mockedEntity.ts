import mockedJobs from './mockedJobs';

const mockedEntity = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(async (id: number) => {
    const jobId: number = id;
    const docs = await mockedJobs.find((job) => job.id === jobId);
    return docs;
  }),
  delete: jest.fn(),
};

export default mockedEntity;
