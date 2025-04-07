import { BootStore } from './BookStore';
import ApiGateway from '../services/ApiGateway';

// Mock the ApiGateway
jest.mock('../services/ApiGateway');

describe('BookStore', () => {
  let store: BootStore;
  let mockApiGateway: jest.Mocked<ApiGateway>;

  const mockBooks = [
    { id: 1, name: 'The Moomins and the Great Flood', author: 'T. Jansson', ownerId: 'const' },
    { id: 2, name: 'When We Were Very Young', author: '	A. A. Milne', ownerId: 'const' }
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    store = new BootStore();
    mockApiGateway = new ApiGateway() as jest.Mocked<ApiGateway>;
    mockApiGateway = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
    };
    (store as any).apiGateway = mockApiGateway;
  });

  describe('loadBooks', () => {
    it('should load public books successfully', async () => {
      mockApiGateway.get.mockResolvedValueOnce(mockBooks);

      await store.loadBooks('const');

      expect(mockApiGateway.get).toHaveBeenCalledWith('const');
      expect(store.books).toEqual(mockBooks);
      expect(store.loading).toBe(false);
    });

    it('should load private books successfully', async () => {
      mockApiGateway.get.mockResolvedValueOnce(mockBooks);

      await store.loadBooks('const', true);

      expect(mockApiGateway.get).toHaveBeenCalledWith('const/private');
      expect(store.books).toEqual(mockBooks);
      expect(store.loading).toBe(false);
    });

    it('should handle loading error', async () => {
      mockApiGateway.get.mockRejectedValueOnce(new Error('Network error'));

      await store.loadBooks('const');

      expect(store.loading).toBe(false);
      expect(store.books).toEqual([]);
    });
  });

  describe('addBook', () => {
    it('should add book successfully', async () => {
      const newBook = { id: 3, name: "Alice's Adventures in Wonderland", author: 'L. Carroll', ownerId: 'const' };
      mockApiGateway.post.mockResolvedValueOnce(newBook);
      mockApiGateway.get.mockResolvedValueOnce([...mockBooks, newBook]);

      await store.addBook('const', "Alice's Adventures in Wonderland", 'L. Carroll');

      expect(mockApiGateway.post).toHaveBeenCalledWith('const', expect.any(Object));
      expect(store.loading).toBe(false);
    });

    it('should handle add book error', async () => {
      mockApiGateway.post.mockRejectedValueOnce(new Error('Network error'));

      await store.addBook('const', "Alice's Adventures in Wonderland", 'L. Carroll');

      expect(store.loading).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset successfully', async () => {
      mockApiGateway.put.mockResolvedValueOnce({});
      mockApiGateway.get.mockResolvedValueOnce([]);

      await store.reset('const');

      expect(mockApiGateway.put).toHaveBeenCalledWith('const/reset');
      expect(store.loading).toBe(false);
      expect(store.books).toEqual([]);
    });

    it('should handle reset error', async () => {
      mockApiGateway.put.mockRejectedValueOnce(new Error('Network error'));

      await store.reset('const');

      expect(store.loading).toBe(false);
    });
  });
});
