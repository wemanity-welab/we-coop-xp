export class MissionDomain {
  private id;
  private profil;
  private client;
  private address;
  private project;
  private description;
  private duration;
  private stack;
  private team_organisation;

  constructor({
    id,
    profil,
    client,
    address,
    project,
    duration,
    description,
    stack,
    team_organisation,
  }: {
    id?: number;
    profil: string;
    client: string;
    address: string;
    project: string;
    duration: string;
    description: string;
    stack: string;
    team_organisation: string;
  }) {
    this.id = id;
    this.profil = profil;
    this.client = client;
    this.address = address;
    this.project = project;
    this.duration = duration;
    this.description = description;
    this.stack = stack;
    this.team_organisation = team_organisation;
  }

  public get getId(): number {
    return this.id;
  }
  public set setId(value: number) {
    this.id = value;
  }

  public get getProfil(): string {
    return this.profil;
  }
  public set setProfil(value: string) {
    this.profil = value;
  }

  public get getClient(): string {
    return this.client;
  }
  public set setClient(value: string) {
    this.client = value;
  }

  public get getAddress(): string {
    return this.address;
  }
  public set setAddress(value: string) {
    this.address = value;
  }

  public get getProject(): string {
    return this.project;
  }
  public set setContract_type(value: string) {
    this.project = value;
  }

  public get getDuration(): string {
    return this.duration;
  }
  public set setDuration(value: string) {
    this.duration = value;
  }

  public get getDescription(): string {
    return this.description;
  }
  public set setDescription(value: string) {
    this.description = value;
  }

  public get getStack(): string {
    return this.stack;
  }
  public set setStack(value: string) {
    this.stack = value;
  }

  public get getTeam_organisation(): string {
    return this.team_organisation;
  }
  public set setTeam_organisation(value: string) {
    this.team_organisation = value;
  }
}
