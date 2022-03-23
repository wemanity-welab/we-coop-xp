export class JobDomain {
  private id: number;
  private title: string;
  private address: string;
  private salary: string;
  private contract_type: string;
  private description: string;
  private author: string;
  // private created_at: string;
  // private updated_at: string;

  constructor({
    id,
    title,
    address,
    salary,
    contract_type,
    author,
    description,
  }: {
    id?: number;
    title: string;
    address: string;
    salary: string;
    contract_type: string;
    author: string;
    description: string;
  }) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.salary = salary;
    this.contract_type = contract_type;
    this.author = author;
    // this.created_at = created_at;
    // this.updated_at = updated_at;
    // this.created_at = `${new Date().getDate()} - ${new Date().getMonth()} - ${new Date().getFullYear()}`;
    // this.updated_at = `${new Date().getDate()} - ${new Date().getMonth()} - ${new Date().getFullYear()}`;
    this.description = description;
  }

  public get getId(): number {
    return this.id;
  }
  public set setId(value: number) {
    this.id = value;
  }

  public get getTitle(): string {
    return this.title;
  }
  public set setTitle(value: string) {
    this.title = value;
  }

  public get getAddress(): string {
    return this.address;
  }
  public set setAddress(value: string) {
    this.address = value;
  }

  public get getSalary(): string {
    return this.salary;
  }
  public set setSalary(value: string) {
    this.salary = value;
  }

  public get getContract_type(): string {
    return this.contract_type;
  }
  public set setContract_type(value: string) {
    this.contract_type = value;
  }

  public get getAuthor(): string {
    return this.author;
  }
  public set setAuthor(value: string) {
    this.author = value;
  }

  // public get getCreated_at(): string {
  //   return this.created_at;
  // }
  // public set setCreated_at(value: string) {
  //   this.created_at = value;
  // }

  // public get setUpdated_at(): string {
  //   return this.updated_at;
  // }
  // public set getUpdated_at(value: string) {
  //   this.updated_at = value;
  // }

  public get getDescription(): string {
    return this.description;
  }
  public set setDescription(value: string) {
    this.description = value;
  }
}
