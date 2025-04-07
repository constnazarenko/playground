import { FC, useEffect, useState } from 'react';

import StickyHeader from '../components/StickyHeader';
import UserSelector from '../components/UserSelector';
import BookStore from '../stores/BookStore';
import BookShelf from './BookShelf';
import './styles.scss';

const App: FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [debouncedUser, setDebouncedUser] = useState<string | null>(null);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedUser(user);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [user]);

  useEffect(() => {
    document.title = `BookStore sample`;
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Welcome to BookStore sample</h1>

        {!!debouncedUser && <StickyHeader />}
        <UserSelector user={user} setUser={setUser} />

        {!debouncedUser && <p style={{ color: 'coral' }}>Please enter your name</p>}

        {debouncedUser && <BookShelf user={debouncedUser} />}
      </div>
    </div>
  );
};

export default App;
