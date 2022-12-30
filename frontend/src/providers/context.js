import { useState, createContext } from "react"

export const GlobalContext = createContext([])

function GlobalProvider(props) {
    const [getItens, setItens] = useState([]);
    const [getListItens, setListItens] = useState([]);
    const [getAccess, setAccess] = useState(null);
    const [currentPage, setCurrentPage] = useState();
    const [darkMode, setDarkMode] = useState(false);
    const [getUser, setUser] = useState()

    return (
        <GlobalContext.Provider
            value={{
                getItens,
                setItens,
                getListItens,
                setListItens,
                getAccess,
                setAccess,
                currentPage,
                setCurrentPage,
                darkMode,
                setDarkMode,
                getUser,
                setUser
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;