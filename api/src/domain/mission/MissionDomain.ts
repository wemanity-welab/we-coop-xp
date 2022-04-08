export class MissionDomain {
  private id;
  private profile;
  private client;
  private address;
  private project;
  private description;
  private duration;
  private stack;
  private teamOrganisation;
  private isActive;

  constructor({
    id,
    profile,
    client,
    address,
    project,
    duration,
    description,
    stack,
    teamOrganisation,
    isActive,
  }: {
    id?: string;
    profile: string;
    client: string;
    address: string;
    project: string;
    duration: string;
    description: string;
    stack: string;
    teamOrganisation: string;
    isActive?: boolean;
  }) {
    this.id = id;
    this.profile = profile;
    this.client = client;
    this.address = address;
    this.project = project;
    this.duration = duration;
    this.description = description;
    this.stack = stack;
    this.teamOrganisation = teamOrganisation;
    this.isActive = isActive;
  }

  public get getId(): string {
    return this.id;
  }
  public set setId(value: string) {
    this.id = value;
  }

  public get getProfile(): string {
    return this.profile;
  }
  public set setProfile(value: string) {
    this.profile = value;
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

  public get getTeamOrganisation(): string {
    return this.teamOrganisation;
  }
  public set setTeamOrganisation(value: string) {
    this.teamOrganisation = value;
  }

  public get getStatus(): boolean {
    return this.isActive;
  }
  public set setStatus(value: boolean) {
    this.isActive = value;
  }
}
