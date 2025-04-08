import { AddBookFormStore } from './AddBookFormStore';
import BookStore from './BookStore';

// Mock the BookStore
jest.mock('./BookStore', () => ({
  addBook: jest.fn(),
}));

describe('AddBookFormStore', () => {
  let store: AddBookFormStore;

  beforeEach(() => {
    store = new AddBookFormStore();
    jest.clearAllMocks();
  });

  it('should initialize with empty values', () => {
    expect(store.name).toBe('');
    expect(store.author).toBe('');
  });

  describe('setField', () => {
    it('should set name field', () => {
      store.setField('name', 'Test Book');
      expect(store.name).toBe('Test Book');
    });

    it('should set author field', () => {
      store.setField('author', 'Test Author');
      expect(store.author).toBe('Test Author');
    });
  });

  describe('submit', () => {
    it('should call BookStore.addBook and reset form', () => {
      store.setField('name', 'Test Book');
      store.setField('author', 'Test Author');

      store.submit('user123');

      expect(BookStore.addBook).toHaveBeenCalledWith('user123', 'Test Book', 'Test Author');
      expect(store.name).toBe('');
      expect(store.author).toBe('');
    });
  });

  describe('reset', () => {
    it('should reset all fields to empty strings', () => {
      store.setField('name', 'Test Book');
      store.setField('author', 'Test Author');

      store.reset();

      expect(store.name).toBe('');
      expect(store.author).toBe('');
    });
  });
});
