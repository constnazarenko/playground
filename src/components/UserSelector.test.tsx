import { act, fireEvent, render, screen } from '@testing-library/react';

import userStore from '../stores/UserStore';
import UserSelector from './UserSelector';

// Mock the userStore
jest.mock('../stores/UserStore', () => ({
  userId: '',
  setUser: jest.fn(),
}));

describe('UserSelector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with placeholder text', () => {
    render(<UserSelector />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('displays initial value from store', () => {
    const mockUserId = 'testUser';
    (userStore.userId as string) = mockUserId;
    render(<UserSelector />);
    expect(screen.getByDisplayValue(mockUserId)).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<UserSelector />);
    const input = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'newUser' } });
    expect(input).toHaveValue('newUser');
  });

  it('debounces store updates by 1000ms', () => {
    render(<UserSelector />);
    const input = screen.getByPlaceholderText('Enter your name');

    fireEvent.change(input, { target: { value: 'newUser' } });
    expect(userStore.setUser).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(userStore.setUser).toHaveBeenCalledWith('newUser');
  });

  it('cleans up timeout on unmount', () => {
    const { unmount } = render(<UserSelector />);
    const input = screen.getByPlaceholderText('Enter your name');

    fireEvent.change(input, { target: { value: 'newUser' } });
    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(userStore.setUser).not.toHaveBeenCalled();
  });
});
