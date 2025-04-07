import { FC } from 'react';
import { BookModel } from '../models/Book';

const Book: FC<BookModel> = ({ name, author, id, ownerId }) => {
  return (
    <div style={{paddingBottom: '1rem'}}>
      <h4>
        {name} [{id}]
      </h4>
      <div>Author: {author}</div>
      <div>Added by: {ownerId}</div>
    </div>
  );
};

export default Book;
