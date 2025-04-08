import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import AddBookForm from '../components/AddBookForm';
import Book from '../components/Book';
import Loading from '../components/Loading';
import BookStore from '../stores/BookStore';
import UserStore from '../stores/UserStore';

const BookShelf: FC = () => {
  const [isPrivate, setIsPrivate] = useState(BookStore.isPrivate);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    if (!UserStore.userId) {
      return;
    }
    BookStore.getBooks(UserStore.userId, isPrivate);
  }, [UserStore.userId, isPrivate]);

  if (!UserStore.userId) {
    return (
      <div>
        <p style={{ color: 'coral' }}>Please enter your name</p>
      </div>
    );
  }

  return (
    <div>
      <h2>User: {UserStore.userId}</h2>

      <div className="tabs">
        <div className={classNames({ tab: true, active: !BookStore.isPrivate })} onClick={() => setIsPrivate(false)}>
          All books
        </div>
        <div className={classNames({ tab: true, active: BookStore.isPrivate })} onClick={() => setIsPrivate(true)}>
          Private books
        </div>
      </div>

      <div className="tabs">
        <button type="button" onClick={() => setIsAddFormOpen((prev) => !prev)}>
          {isAddFormOpen ? 'Close form' : 'Open add book form'}
        </button>
        {!!BookStore.loading && <Loading />}
        <button type="button" onClick={() => BookStore.reset(UserStore.userId)}>
          Reset
        </button>
      </div>

      {isAddFormOpen && <AddBookForm onSubmit={() => setIsAddFormOpen(false)} />}

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
