export class MissionDomain {
  private id;
  private title;
  private client;
  private profile;
  private description;
  private isActive;

  constructor({
    id,
    title,
    profile,
    client,
    description,
    isActive,
  }: {
    id?: string;
    title: string;
    client: string;
    profile: string;
    description: string;
    isActive?: boolean;
  }) {
    this.id = id;
    this.title = title;
    this.client = client;
    this.profile = profile;
    this.description = description;
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

  public get getTitle(): string {
    return this.title;
  }
  public set setTitle(value: string) {
    this.title = value;
  }

  public get getDescription(): string {
    return this.description;
  }
  public set setDescription(value: string) {
    this.description = value;
  }

  public get getStatus(): boolean {
    return this.isActive;
  }
  public set setStatus(value: boolean) {
    this.isActive = value;
  }
}
