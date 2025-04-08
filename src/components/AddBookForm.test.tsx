import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import AddBookFormStore from '../stores/AddBookFormStore';
import AddBookForm from './AddBookForm';

// Mock the stores
jest.mock('../stores/AddBookFormStore', () => ({
  name: '',
  author: '',
  setField: jest.fn(),
  submit: jest.fn(),
}));

jest.mock('../stores/UserStore', () => ({
  userId: 'test-user-id',
}));

describe('AddBookForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with all elements', () => {
    render(<AddBookForm />);

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Author')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Add Book');
  });

  it('updates form fields when typing', () => {
    render(<AddBookForm />);

    const nameInput = screen.getByPlaceholderText('Name');
    const authorInput = screen.getByPlaceholderText('Author');

    fireEvent.change(nameInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });

    expect(AddBookFormStore.setField).toHaveBeenCalledWith('name', 'Test Book');
    expect(AddBookFormStore.setField).toHaveBeenCalledWith('author', 'Test Author');
  });

  it('submits the form and calls onSubmit callback', () => {
    const onSubmit = jest.fn();
    render(<AddBookForm onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByRole('form'));

    expect(AddBookFormStore.submit).toHaveBeenCalledWith('test-user-id');
    expect(onSubmit).toHaveBeenCalled();
  });
});
