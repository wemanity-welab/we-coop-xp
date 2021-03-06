import Utils from '../../../src/utils/Utils';
import { IAdapter } from '../../utils/interfaces/IAdapter';
import { Cooperator } from '../../utils/types/Cooperator';

class AdapterMock implements IAdapter<Cooperator, string> {
  datas: any[];

  constructor(datas: any = []) {
    this.datas = datas;
  }

  async save(data: Cooperator): Promise<Cooperator> {
    await this.datas.push(data);
    return data;
  }
  async getAll(): Promise<Cooperator[]> {
    return await this.datas;
  }
  async remove(id: string): Promise<string> {
    const dataFound = await this.datas.find((data) => data.id === id);
    await this.datas.splice(this.datas.indexOf(dataFound), 1);
    return `Cooperateur n°${dataFound.id} supprimé.`;
  }

  async update(id: string, data: Cooperator): Promise<Cooperator> {
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
  async getOne(id: string): Promise<Cooperator> {
    return await this.datas.find((data) => data.id === id);
  }

  async search(keywords: any) {
    const filtered: any = [];
    this.datas.forEach((cooperator: any, idx: any) => {
      for (const property in cooperator) {
        const words = cooperator[property].split(/[\s,]+/);
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
