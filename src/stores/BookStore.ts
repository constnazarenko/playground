import { makeAutoObservable, runInAction } from 'mobx';

import { BookModel } from '../models/Book';
import ApiGateway from '../services/ApiGateway';

export class BootStore {
  books: BookModel[] = [];
  loading = false;
  isPrivate = false;
  private apiGateway: ApiGateway;

  constructor() {
    this.apiGateway = new ApiGateway();
    makeAutoObservable(this);
  }

  getBooks = async (userId: string, isPrivate: boolean = undefined) => {
    this.loading = true;
    this.isPrivate = isPrivate === undefined ? this.isPrivate : isPrivate;
    try {
      const data: BookModel[] = await this.apiGateway.get(this.isPrivate ? `${userId}/private` : userId);
      runInAction(() => {
        this.books = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  addBook = async (userId: string, name: string, author: string) => {

    const data = {
      id: Math.round(Math.random() * 1000000),
      name,
      author,
      ownerId: userId,
    };

    this.loading = true;
    try {
      await this.apiGateway.post(userId, data);
      //refresh the book list after adding a book
      // possibly the data could be pushed to the this.books directly if no BE validation/processing is needed
      await this.getBooks(userId);
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  reset = async (userId: string) => {
    this.loading = true;
    try {
      await this.apiGateway.put(`${userId}/reset`);
      //refresh the book list after reset
      // possibly the data could be pushed to the this.books directly if no BE validation/processing is needed
      await this.getBooks(userId);
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const bootStore = new BootStore();
export default bootStore;
