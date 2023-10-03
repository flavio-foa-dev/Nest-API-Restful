export class UserRepository {
  private users = [];

  async save(user) {
    this.users.push(user);

    console.log('Saved user', this.users);
  }

  async getUsers() {
    return this.users;
  }
}
