import { IUser } from '../types';

export default class User {
  private static user: IUser;

  public static async setUser(loggedInUser: IUser) {
    this.user = loggedInUser;
  }

  public static get getUser() {
    return this.user;
  }
}
