import { FC, useEffect, useState } from 'react';

import './styles.scss';
import UserSelector from '../components/UserSelector';
import BookShelf from './BookShelf';

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

        <UserSelector user={user} setUser={setUser} />

        {!debouncedUser && <p style={{color: 'coral'}}>Please enter your name</p>}

        {debouncedUser && (<BookShelf user={debouncedUser} />)}
      </div>
    </div>
  );
};

export default App;
