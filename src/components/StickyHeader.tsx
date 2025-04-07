import { FC } from 'react';
import BookStore from '../stores/BookStore';
import { observer } from 'mobx-react-lite';

// TODO: extract css to a stylesheet.
const StickyHeader: FC = () => (
  <div style={{position: "sticky", top: '20px', background: 'var(--bg-blue)', border: '1px dashed var(--text-white)', padding: '3px 10px', marginBottom: '1rem'}}>You currently have {BookStore.amountOfPrivateBooks} private book{BookStore.amountOfPrivateBooks === 1 ? '' : 's'}.</div>
);

export default observer(StickyHeader);
