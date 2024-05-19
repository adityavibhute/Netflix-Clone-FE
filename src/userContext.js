import React, { useContext } from 'react';

const defaultContext = {
    userDetails: {}
}

const UserContext = React.createContext(defaultContext);

export const useUserContext = () => useContext(UserContext);

export default UserContext;