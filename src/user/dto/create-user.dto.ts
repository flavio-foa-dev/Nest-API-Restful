export class CreateUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
  confirmationToken: string;
  recoveryToken: string;
  roles: string;
  satatus: boolean;
}
