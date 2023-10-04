export class ListUserDTO {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(id: string, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
