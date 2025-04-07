import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Book from './Book';
import { BookModel } from '../models/Book';

describe('Book Component', () => {
  const mockBook: BookModel = {
    id: 123,
    name: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    ownerId: 'constantine',
  };

  it('renders the book information correctly', () => {
    render(<Book {...mockBook} />);

    expect(screen.getByText(`${mockBook.name} [${mockBook.id}]`)).toBeInTheDocument();
    expect(screen.getByText(`Author: ${mockBook.author}`)).toBeInTheDocument();
    expect(screen.getByText(`Added by: ${mockBook.ownerId}`)).toBeInTheDocument();
  });

  it('applies the provided style', () => {
    const { container } = render(<Book {...mockBook} />);
    const bookDiv = container.firstChild as HTMLDivElement | null;
    expect(bookDiv?.style.paddingBottom).toBe('1rem');
  });
});
