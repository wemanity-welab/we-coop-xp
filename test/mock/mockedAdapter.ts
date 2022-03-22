import { IJobRepository } from '../../src/domain/job/IJobRepository';
import { IJobService } from '../../src/domain/job/IJobService';
import { JobDomain } from '../../src/domain/job/JobDomain';
import { JobService } from '../../src/domain/job/JobService';

class Mock {
  datas: any[];

  constructor() {
    this.datas = [];
  }

  async save(data: any): Promise<any> {
    this.datas.push(data);
    return await 'Success';
  }
  async getAll(): Promise<any[]> {
    return await this.datas;
  }
  async remove(id: any): Promise<any> {
    const dataFound = await this.datas.find((data) => data.id === id);
    this.datas.splice(this.datas.indexOf(dataFound), 1);
    return await 'DATA REMOVED';
  }

  // async updateGeneric(value: any, newValue: any, updateKey, valueKey) {
  //   return this.datas.map((element) => {
  //     if ((element[valueKey] = value)) {
  //       element[updateKey] = newValue;
  //     } else {
  //       throw new Error('cannot update');
  //     }
  //     return element;
  //   });
  // }

  // public getGetters(): string[] {
  //   return Object.keys(this.constructor.prototype).filter((name) => {
  //     return (
  //       typeof Object.getOwnPropertyDescriptor(
  //         this.constructor.prototype,
  //         name,
  //       )['get'] === 'function'
  //     );
  //   });
  // }

  // public getSetters(): string[] {
  //   return Object.keys(this.constructor.prototype).filter((name) => {
  //     return (
  //       typeof Object.getOwnPropertyDescriptor(
  //         this.constructor.prototype,
  //         name,
  //       )['set'] === 'function'
  //     );
  //   });
  // }

  async update(id: any, data: any): Promise<any> {
    const dataFound = await this.datas.find((data) => data.id === id);

    if (!dataFound) {
      throw new Error('DATA NOT FOUND');
    }

    const indexOfDataFound = this.datas.indexOf(dataFound);

    const obj = {
      ...this.datas[indexOfDataFound],
      ...data,
    };

    console.log(obj);

    return (this.datas[indexOfDataFound] = obj);

    // // Permet d'obtenir les noms des methods d'un objet
    // const objectMethodsNames = Reflect.ownKeys(
    //   Object.getPrototypeOf(this.datas[indexOfDataFound]),
    // );

    // console.log(`METHODS NAME: `, objectMethodsNames);

    // console.log(`id :`, this.datas[indexOfDataFound]['getId']);

    // const method = this.datas[indexOfDataFound].map((method) => {
    //   if (method === 'setTitle') {
    //   }
    // });

    // this.datas[indexOfDataFound][`${method}`];
    // this.datas[indexOfDataFound].setTitle =
    //   data.getTitle !== ''
    //     ? data.getTitle
    //     : this.datas[indexOfDataFound].getTitle;

    // this.datas[indexOfDataFound].setAddress =
    //   data.getAddress !== ''
    //     ? data.getAddress
    //     : this.datas[indexOfDataFound].getAddress;

    // this.datas[indexOfDataFound].setSalary =
    //   data.getSalary !== ''
    //     ? data.getSalary
    //     : this.datas[indexOfDataFound].getSalary;

    // this.datas[indexOfDataFound].setContract_type =
    //   data.getContract_type !== ''
    //     ? data.getContract_type
    //     : this.datas[indexOfDataFound].getContract_type;

    // this.datas[indexOfDataFound].setAuthor =
    //   data.getAuthor !== ''
    //     ? data.getAuthor
    //     : this.datas[indexOfDataFound].getAuthor;

    // this.datas[indexOfDataFound].setDescription =
    //   data.getDescription !== ''
    //     ? data.getDescription
    //     : this.datas[indexOfDataFound].getDescription;

    // return this.datas[indexOfDataFound];
  }
  async getJob(id: any): Promise<any> {
    return await this.datas.find((data) => data.id === id);
  }
}

// const mockedAdapter: IJobRepository = {
//   save: async (job: JobDomain): Promise<string> => {
//     mockedJobs.push(job);
//     return await 'Success';
//   },
//   getAll: async (): Promise<JobDomain[]> => {
//     return mockedJobs;
//   },
//   getJob: async (id: number): Promise<JobDomain> => {
//     return await mockedJobs.find((job) => job.id === id);
//   },
//   remove: async (id: number): Promise<string> => {
//     const jobId = id;
//     const jobFound = await mockedJobs.find((job) => job.id === jobId);
//     mockedJobs.splice(mockedJobs.indexOf(jobFound), 1);
//     return await 'Job offer removed';
//   },
//   update: async (jobId: number, job: JobDomain): Promise<JobDomain> => {
//     const jobFound = await mockedJobs.find((job) => job.id === jobId);
//     if (!jobFound) {
//       throw new Error('JOB NOT FOUND');
//     }

//     const indexOfJobFound = mockedJobs.indexOf(jobFound);

//     mockedJobs[indexOfJobFound].setTitle =
//       job.getTitle !== '' ? job.getTitle : mockedJobs[indexOfJobFound].getTitle;

//     mockedJobs[indexOfJobFound].setAddress =
//       job.getAddress !== ''
//         ? job.getAddress
//         : mockedJobs[indexOfJobFound].getAddress;

//     mockedJobs[indexOfJobFound].setSalary =
//       job.getSalary !== ''
//         ? job.getSalary
//         : mockedJobs[indexOfJobFound].getSalary;

//     mockedJobs[indexOfJobFound].setContract_type =
//       job.getContract_type !== ''
//         ? job.getContract_type
//         : mockedJobs[indexOfJobFound].getContract_type;

//     mockedJobs[indexOfJobFound].setAuthor =
//       job.getAuthor !== ''
//         ? job.getAuthor
//         : mockedJobs[indexOfJobFound].getAuthor;

//     mockedJobs[indexOfJobFound].setDescription =
//       job.getDescription !== ''
//         ? job.getDescription
//         : mockedJobs[indexOfJobFound].getDescription;

//     return mockedJobs[indexOfJobFound];
//   },
// };

export default Mock;
