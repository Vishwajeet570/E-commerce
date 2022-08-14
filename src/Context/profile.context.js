import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const inValue = {
    count: 0,
    cost: 0,
    productId: [],
  };

  const [cartdetails, setCartdetails] = useState(inValue);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('count'));
    const realCost = JSON.parse(localStorage.getItem('cost'));
    const realProductId = JSON.parse(localStorage.getItem('productId'));
    if (items > 0) {
      setCartdetails({
        count: items,
        cost: realCost,
        productId: realProductId,
      });
    } else {
      setCartdetails(inValue);
    }
  }, []);

  return (
    <ProfileContext.Provider value={[cartdetails, setCartdetails]}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
