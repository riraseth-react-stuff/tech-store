import React, { createContext, useState } from 'react';

const UserContext = createContext();

const getUserFromLocalStorage = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { username: null, token: null };
};

function UserProvider({ children }) {
  // const [user, setUser] = useState({ username: null, token: null });
  const [user, setUser] = useState(getUserFromLocalStorage());

  const userLogin = user => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem('user');
    setAlert({ show: true, msg: 'user logged out' });
    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });

  const showAlert = ({ msg, type = 'success' }) => {
    setAlert({ show: true, msg, type });
    setTimeout(() => {
      hideAlert();
    }, 4000);
  };
  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };
  return (
    <UserContext.Provider
      value={{ user, userLogin, userLogout, alert, showAlert, hideAlert }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
