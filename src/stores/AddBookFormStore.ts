import { makeAutoObservable } from 'mobx';

import BookStore from './BookStore';

class AddBookFormStore {
  name = '';
  author = '';

  constructor() {
    makeAutoObservable(this);
  }

  setField(field: 'name' | 'author', value: string) {
    this[field] = value;
  }

  submit(userId: string) {
    BookStore.addBook(userId, this.name, this.author);
    this.reset();
  }

  reset() {
    this.name = '';
    this.author = '';
  }
}

const bookAddForm = new AddBookFormStore();
export default bookAddForm;
export { AddBookFormStore };
