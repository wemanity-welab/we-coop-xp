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

  async update(id: any, data: any) {
    const dataFound = await this.datas.find((data) => data.id === id);

    if (!dataFound) {
      throw new Error('DATA NOT FOUND');
    }

    const indexOfDataFound = this.datas.indexOf(dataFound);

    const obj = {
      ...this.datas[indexOfDataFound],
      ...data,
    };
    return (this.datas[indexOfDataFound] = obj);
  }
  async getOne(id: any): Promise<any> {
    return await this.datas.find((data) => data.id === id);
  }
}

export default Mock;
