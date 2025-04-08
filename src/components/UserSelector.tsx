import { FC, useEffect, useState } from 'react';

import userStore from '../stores/UserStore';

const UserSelector: FC = () => {
  const [userId, setUserId] = useState(userStore.userId);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      userStore.setUser(userId);
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [userId]);

  return (
    <input type="text" placeholder="Enter your name" value={userId || ''} onChange={(e) => setUserId(e.target.value)} />
  );
};

export default UserSelector;
