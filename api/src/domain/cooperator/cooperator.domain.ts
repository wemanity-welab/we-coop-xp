export class CooperatorDomain {
  private id?: string;
  private firstName: string;
  private lastName: string;
  private phoneNumber: string;
  private email: string;
  private practice: string;
  private m3?: string;
  private mentor?: string;

  constructor({
    id,
    firstName,
    lastName,
    phoneNumber,
    email,
    practice,
    m3,
    mentor,
  }: {
    id?: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
    email: string;
    practice: string;
    m3?: string;
    mentor?: string;
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.practice = practice;
    this.m3 = m3;
    this.mentor = mentor;
  }

  get getId(): string {
    return this.id;
  }
  set setId(value: string) {
    this.id = value;
  }

  get getFirstName(): string {
    return this.firstName;
  }
  set setFirstName(value: string) {
    this.firstName = value;
  }

  get getLastName(): string {
    return this.lastName;
  }
  set setLastName(value: string) {
    this.lastName = value;
  }

  get getPhoneNumber(): string {
    return this.phoneNumber;
  }
  set setPhoneNumber(value: string) {
    this.phoneNumber = value;
  }

  get getEmail(): string {
    return this.email;
  }
  set setEmail(value: string) {
    this.email = value;
  }

  get getPractice(): string {
    return this.practice;
  }
  set setPractice(value: string) {
    this.practice = value;
  }

  get getM3(): string {
    return this.m3;
  }
  set setM3(value: string) {
    this.m3 = value;
  }

  get getMentor(): string {
    return this.mentor;
  }
  set setMentor(value: string) {
    this.mentor = value;
  }
}
