import { JobDomain } from './job.domain';
import { Test, TestingModule } from '@nestjs/testing';
import { JobRepository } from './job.repository';

//15min doc, prototyper pour ensuite estimer

class MockJobAdapter implements JobRepository {
  private jobDomain: JobDomain;
  constructor(jobDomain: JobDomain) {
    this.jobDomain = jobDomain;
  }

  getAll(): Promise<JobDomain[]> {
    throw new Error('Method not implemented.');
  }
  remove(jobId: number): Promise<string> {
    throw new Error('Method not implemented.');
  }
  save(job: JobDomain): any {
    if (job) {
      return { job, message: 'success' };
    }
  }
}

//TODO MOCK create class jobAdapter

describe('should test job adapter class', () => {
  let mockedAdapter: MockJobAdapter;
  let mockedJob: JobDomain;

  beforeEach(() => {
    mockedJob = new JobDomain({
      title: 'dev',
      address: 'rue de Paris',
      salary: '2000',
      contract_type: 'CDI',
      author: 'Pole emploi',
      description: 'Postule ici',
    });

    mockedAdapter = new MockJobAdapter(mockedJob);
  });

  it('should return success', () => {
    const result = 'success';
    const message = mockedAdapter.save(mockedJob).message;

    jest.spyOn(mockedAdapter, 'save').mockImplementation(() => result);

    expect(message).toBe(result);
  });

  it('should return an object', () => {
    const result = 'object';
    const typeOfReturnedObject = typeof mockedAdapter.save(mockedJob).job;

    jest.spyOn(mockedAdapter, 'save').mockImplementation(() => result);

    expect(typeOfReturnedObject).toBe(result);
  });

  it('should return a job object', () => {
    const result = new JobDomain({
      title: 'dev',
      address: 'rue de Paris',
      salary: '2000',
      contract_type: 'CDI',
      author: 'Pole emploi',
      description: 'Postule ici',
    });
    const returnedJob = mockedAdapter.save(mockedJob).job;

    jest.spyOn(mockedAdapter, 'save').mockImplementation(() => result);

    expect(returnedJob).toStrictEqual(result);
  });
});
