import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import AddBookFormStore from '../stores/AddBookFormStore';
import UserStore from '../stores/UserStore';

interface AddBookFormProps {
  onSubmit?: () => void;
}

const AddBookForm: FC<AddBookFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AddBookFormStore.submit(UserStore.userId);
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form" role="form">
      <h2>Add New Book</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={AddBookFormStore.name}
          onChange={(e) => AddBookFormStore.setField('name', e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Author"
          value={AddBookFormStore.author}
          onChange={(e) => AddBookFormStore.setField('author', e.target.value)}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default observer(AddBookForm);
