import { autorun } from 'mobx';

import { UserStore } from './UserStore';

describe('UserStore', () => {
  let store: UserStore;

  beforeEach(() => {
    store = new UserStore();
  });

  it('should initialize with null userId', () => {
    expect(store.userId).toBeNull();
  });

  it('should set userId', () => {
    store.setUser('test-user-123');
    expect(store.userId).toBe('test-user-123');
  });

  it('should set userId to null', () => {
    store.setUser('test-user-123');
    store.setUser(null);
    expect(store.userId).toBeNull();
  });

  it('should be observable', () => {
    const mockFn = jest.fn();
    autorun(() => {
      mockFn(store.userId);
    });

    expect(mockFn).toHaveBeenCalledWith(null);
    store.setUser('test-user-123');
    expect(mockFn).toHaveBeenCalledWith('test-user-123');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
