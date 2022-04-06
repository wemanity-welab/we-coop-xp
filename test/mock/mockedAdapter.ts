import Utils from '../../src/utils/Utils';
import { IAdapter } from '../utils/interfaces/IAdapter';
import { Mission } from '../utils/types/Mission';

class AdapterMock implements IAdapter<Mission, string> {
  datas: any[];

  constructor() {
    this.datas = [];
  }

  async save(data: Mission): Promise<Mission> {
    await this.datas.push(data);
    return data;
  }
  async getAll(): Promise<Mission[]> {
    return await this.datas;
  }
  async remove(id: string): Promise<string> {
    const dataFound = await this.datas.find((data) => data.id === id);
    await this.datas.splice(this.datas.indexOf(dataFound), 1);
    return `Mission deleted`;
  }

  async update(id: string, data: Mission): Promise<Mission> {
    const dataFound = await this.datas.find((data) => data.id === id);
    if (!dataFound) {
      throw new Error('DATA NOT FOUND');
    }

    const indexOfDataFound = this.datas.indexOf(dataFound);
    data.id = this.datas[indexOfDataFound].id;

    const obj = {
      ...this.datas[indexOfDataFound],
      ...data,
    };

    return (this.datas[indexOfDataFound] = obj);
  }
  async getOne(id: string): Promise<Mission> {
    return await this.datas.find((data) => data.id === id);
  }

  search(keywords: any) {
    const filtered: any = [];
    this.datas.forEach((mission: any, idx: any) => {
      for (const property in mission) {
        const words = mission[property].split(/[\s,]+/);
        words.forEach((word: any) => {
          keywords.forEach((keyword: any) => {
            if (word === keyword) {
              filtered.push(this.datas[idx]);
            }
          });
        });
      }
    });
    return Utils.removeDuplicateObject(filtered);
  }
}

export default AdapterMock;
