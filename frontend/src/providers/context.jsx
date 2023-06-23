/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext([]);

function GlobalProvider({ children }) {
    const [getItens, setItens] = useState([]);
    const [getListItens, setListItens] = useState([]);
    const [getAccess, setAccess] = useState(null);
    const [getCurrentPage, setCurrentPage] = useState('none');
    const [darkMode, setDarkMode] = useState(false);
    const [getUser, setUser] = useState('');

    return (
        <GlobalContext.Provider
            value={{
                getItens,
                setItens,
                getListItens,
                setListItens,
                getAccess,
                setAccess,
                getCurrentPage,
                setCurrentPage,
                darkMode,
                setDarkMode,
                getUser,
                setUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalProvider;
