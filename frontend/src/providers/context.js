import { useState, createContext } from "react"

const GlobalContext = createContext([])

function GlobalProvider(props) {
    const [getItens, setItens] = useState([]);

    return (
        <GlobalContext.Provider value={{ getItens, setItens }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;