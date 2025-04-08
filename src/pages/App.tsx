import { FC, useEffect } from 'react';

import StickyHeader from '../components/StickyHeader';
import UserSelector from '../components/UserSelector';
import BookShelf from './BookShelf';
import './styles.scss';

const App: FC = () => {
  useEffect(() => {
    document.title = `BookStore sample`;
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <h1>Welcome to BookStore sample</h1>

        <StickyHeader />
        <UserSelector />
        <BookShelf />
      </div>
    </div>
  );
};

export default App;
