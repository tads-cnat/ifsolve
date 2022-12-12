import { useState, createContext } from "react"

export const GlobalContext = createContext([])

function GlobalProvider(props) {
    const [getItens, setItens] = useState([]);
    const [getListItens, setListItens] = useState([]);
    const [getAccess, setAccess] = useState(null);


    return (
        <GlobalContext.Provider
            value={{
                getItens,
                setItens,
                getListItens,
                setListItens,
                getAccess,
                setAccess
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;