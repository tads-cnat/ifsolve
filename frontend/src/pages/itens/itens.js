import axios from "axios";
import { useState, useEffect } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import { api } from "../../api/config";

export default function Itens() {
    const [itens, setItens] = useState([]);
    const [getListItens, setListItens] = useState([]);
    const [getSearch, setSearch] = useState("");
    const [access, setAccess] = useState(null);
    const [getHandleForm, setHandleForm] = useState(false);
    const [getTitulo, setTitulo] = useState("");
    const [getAssunto, setAssunto] = useState("");
    const [getTextoBase, setTextoBase] = useState("");
    const [getEnunciado, setEnunciado] = useState("");
    const [getExpectativaResposta, setExpectativaResposta] = useState("");

    useEffect(() => {
        api.post("login/", {
            "username": "diogo",
            "password": "19111911dio"
        }).then((res) => {
            setAccess(res.data.access)
        })
    }, [])

    function getItems() {
        axios.get("http://127.0.0.1:8000/item/elaborador/",
            {
                headers: {
                    "Authorization": "Bearer " + access,
                }
            },
        ).then((res) => {
            setItens([...res.data].reverse());
            setListItens([...res.data].reverse());
        })
    }

    useEffect(() => {
        getItems();
    }, [access])

    function newItem(e) {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/item/",
            {
                "tipo": "DI",
                "visibilidade": "PU",
                "assunto": getAssunto,
                "titulo": getTitulo,
                "data_publicacao": "2022-12-08T22:18:28.922Z",
                "texto_base": getTextoBase,
                "enunciado": getEnunciado,
                "expectativa_resposta": getExpectativaResposta,
                "alternativa_correta": "s",
                "elaborador": "1",
                "area": "1",
                "alternativa_a": "",
                "alternativa_b": "",
                "alternativa_c": "",
                "alternativa_d": "",
                "alternativa_e": "",
                "tags": [
                    "1"
                ]
            },
            {
                headers: {
                    "Authorization": "Bearer " + access
                }
            }
        ).then((res) => {
            console.log(res);
            getItems();
            setAssunto("");
            setTitulo("");
            setTextoBase("");
            setEnunciado("");
            setExpectativaResposta("");
        })
    }

    function handleTitulo(e) {
        setTitulo(e);
    }
    function handleAssunto(e) {
        setAssunto(e);
    }
    function handleTextoBase(e) {
        setTextoBase(e);
    }
    function handleEnunciado(e) {
        setEnunciado(e);
    }
    function handleExpectativaResposta(e) {
        setExpectativaResposta(e);
    }

    useEffect(() => {
        getSearch != "" ?
            setListItens(itens.filter(item =>
                item.titulo.includes(getSearch) || item.assunto.includes(getSearch)
            ))
            :
            setListItens(itens)
    }, [getSearch])


    return (
        <div id="itens" className="p-5 w-full flex flex-col">
            <div className="flex gap-4 mb-5">
                <h1 className="text-3xl font-bold">Questões</h1>
                {process.env.baseURL}
                <button onClick={(e) => setHandleForm(true)} className="bg-primary-80 rounded-lg hover:bg-primary-100 w-8 h-8">+</button>
            </div>

            <div className={getHandleForm ? "fixed flex w-72 h-screen flex-col top-0 right-0 p-5 bg-white shadow-lg" : "hidden w-0"}>
                <form action="" onSubmit={(e) => newItem(e)} >
                    <div className="flex justify-between">
                        <h3 className="text-lg font-medium mb-5">Nova Questão</h3>
                        <FiX onClick={(e) => setHandleForm(false)}></FiX>
                    </div>

                    <div className="mb-5">
                        <label className="text-sm font-medium text-dark-80 mt-5">Título</label>
                        <input type="text" value={getTitulo} onChange={(e) => handleTitulo(e.target.value)} name="company-website" id="company-website" className="w-full px-4 py-2 mt-2 rounded-md border-2 border-dark-10 text-primary-50 focus:border-primary-100 focus:outline-primary-100 active:border-primary-100" required />
                    </div>

                    <div className="mb-5">
                        <label className="text-sm font-medium text-dark-80 mt-5">Assunto</label>
                        <input type="text" value={getAssunto} onChange={(e) => handleAssunto(e.target.value)} name="company-website" id="company-website" className="w-full px-4 py-2 mt-2 rounded-md border-2 border-dark-10 text-primary-50 focus:border-primary-100 focus:outline-primary-100 active:border-primary-100" required />
                    </div>

                    <div className="mb-5">
                        <label className="text-sm font-medium text-dark-80 mt-5">Texto base</label>
                        <input type="text" value={getTextoBase} onChange={(e) => handleTextoBase(e.target.value)} name="company-website" id="company-website" className="w-full px-4 py-2 mt-2 rounded-md border-2 border-dark-10 text-primary-50 focus:border-primary-100 focus:outline-primary-100 active:border-primary-100" required />
                    </div>

                    <div className="mb-5">
                        <label className="text-sm font-medium text-dark-80 mt-5">Enunciado</label>
                        <input type="text" value={getEnunciado} onChange={(e) => handleEnunciado(e.target.value)} name="company-website" id="company-website" className="w-full px-4 py-2 mt-2 rounded-md border-2 border-dark-10 text-primary-50 focus:border-primary-100 focus:outline-primary-100 active:border-primary-100" required />
                    </div>

                    <div className="mb-5">
                        <label className="text-sm font-medium text-dark-80 mt-5">Expectativa de resposta</label>
                        <textarea rows="3" value={getExpectativaResposta} onChange={(e) => handleExpectativaResposta(e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border-2 border-dark-10 text-primary-50 focus:border-primary-100 focus:outline-primary-100 active:border-primary-100" required></textarea>
                    </div>

                    <button type="submit" className="p-5 text-dark-100 font-medium w-full rounded-lg bg-primary-60 hover:bg-primary-100">Cadastrar</button>
                </form>
            </div>


            <div className="mb-5 px-4 py-2 rounded-lg flex flex-row items-center gap-2 bg-white mr-auto">
                <FiSearch></FiSearch>
                <input type="text" className="focus:border-0 focus:outline-0" placeholder="Buscar..." value={getSearch} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="mb-5">
                <p>Encontramos <b>{getListItens.length} questões</b>🙌</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
                {getListItens.length > 0 ? getListItens.map((item) =>
                    <div key={item.id} className="bg-white p-5 box-border border-4 border-white rounded-lg hover:border-4 hover:border-primary-100">
                        <small className="text-sm">{item.assunto}</small>
                        <p className="text-md font-medium text-dark-80">{item.titulo}</p>
                    </div>
                ) : <p>Nenhum item carregado...</p>}
            </div>
        </div>
    )
}