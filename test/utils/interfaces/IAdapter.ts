export interface IAdapter<T, U> {
  datas: T[];
  save(data: T): Promise<T>;
  getAll(): Promise<T[]>;
  remove(id: U): Promise<U>;
  update(id: U, data: T): Promise<T>;
  getOne(id: U): Promise<T>;
}
