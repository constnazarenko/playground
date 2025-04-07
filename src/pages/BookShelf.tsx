import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import Book from '../components/Book';
import Loading from '../components/Loading';
import BookStore from '../stores/BookStore';

interface BookShelfProps {
  user: string;
}

// TODO: replace hardcoded book data:
const BOOK = {
  name: 'The Silmarillion',
  author: 'J.R.R. Tolkien',
};

const BookShelf: FC<BookShelfProps> = ({ user }) => {
  const [isPrivate, setIsPrivate] = useState(BookStore.isPrivate);

  useEffect(() => {
    BookStore.getBooks(user, isPrivate);
  }, [user, isPrivate]);

  return (
    <div>
      <h2>User: {user}</h2>

      <div className="tabs">
        <div className={classNames({ tab: true, active: !BookStore.isPrivate })} onClick={() => setIsPrivate(false)}>
          All books
        </div>
        <div className={classNames({ tab: true, active: BookStore.isPrivate })} onClick={() => setIsPrivate(true)}>
          Private books
        </div>
      </div>

      <div className="tabs">
        <button type="button" onClick={() => BookStore.addBook(user, BOOK.name, BOOK.author)}>
          Add
        </button>
        {!!BookStore.loading && <Loading />}
        <button type="button" onClick={() => BookStore.reset(user)}>
          Reset
        </button>
      </div>

      {!!BookStore.books.length && (
        <div>
          <h3>{isPrivate ? 'My Books' : 'All Books'}</h3>
          {BookStore.books.map((book) => (
            <Book key={book.id} {...book} />
          ))}
        </div>
      )}

      {!BookStore.books.length && <p style={{ color: 'coral' }}>No books found</p>}
    </div>
  );
};

export default observer(BookShelf);
