import { FC } from 'react';

interface UserSelectorProps {
  user: string | null;
  setUser: (user: string | null) => void;
}

const UserSelector: FC<UserSelectorProps> = ({ user, setUser }) => {
  return (
    <input type="text" placeholder="Enter your name" value={user || ''} onChange={(e) => setUser(e.target.value)} />
  );
};

export default UserSelector;
