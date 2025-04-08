import { makeAutoObservable } from 'mobx';

class UserStore {
  userId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(userId: string | null) {
    this.userId = userId;
  }
}

export default new UserStore();
export { UserStore };
