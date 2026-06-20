import React, { createContext, useContext, useState } from 'react';

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const [followers, setFollowers] = useState(0);

  const increaseFollow = () => setFollowers(prev => prev + 1);
  const decreaseFollow = () => setFollowers(prev => prev - 1);

  return (
    <FollowContext.Provider value={{
      followers,
      increaseFollow,
      decreaseFollow,
    }}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => useContext(FollowContext);