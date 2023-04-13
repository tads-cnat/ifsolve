import { useContext, useEffect, useState } from "react";
import { FiAlignLeft, FiCheckSquare, FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GetItems } from "../../api/config";
import { SidebarLayout } from "../../components";
import { GlobalContext } from "../../providers/context";

export default function AlunoListarItem() {
    const { setCurrentPage } = useContext(GlobalContext);
    const [getData, setData] = useState([]);
    const [getSearch, setSearch] = useState("");

    // Executa quando o componente é carregado
    useEffect(() => {
        // Define página atual
        setCurrentPage("questoes");

        GetItems().then(res => {
            setData(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const filteredData = getSearch.length > 0 ? getData.filter(item => item.titulo.includes(getSearch)) : getData;

    return (
        <SidebarLayout>
                <div className="container py-5 flex flex-col gap-4">
                    <h2 className="text-3xl font-bold text-dark-100">Questões</h2>
                    <div className="flex justify-between">
                        <input className="bg-dark-10 px-4 py-2 rounded-lg" type="text" placeholder="Busque por titulo, assunto, código..." onChange={e => setSearch(e.target.value)} />
                        <button type="button" className="flex items-center px-4 py-2 bg-white rounded-lg text-dark-80 gap-4 hover:bg-dark-10"><FiFilter /> Filtros</button>
                    </div>
                    <div className="flex">
                        <span className="basis-6/12">Encontramos <b> {filteredData.length} {filteredData.length > 1 ? "questões!" : "questão!"} </b>🙌</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        {filteredData.map((item, i) =>
                            <CardItem key={i} item={item} />
                        )}
                    </div>
                </div>
            </SidebarLayout>
    )
}

function CardItem(props) {
    return (
        <Link to={`/item/${props.item.id}/responder`} className="bg-white px-4 py-2 rounded-lg flex flex-row gap-2 justify-start items-center">
            <div className="bg-primary-20 w-10 h-10 flex items-center justify-center rounded-lg">
                <div className="text-primary-100 text-xl">
                    {props.item.tipo === "ME" ? <FiCheckSquare /> : <FiAlignLeft />}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <small className="text-sm">{props.item.assunto}</small>
                <h4 className="text-lg">{props.item.titulo}</h4>
                <div className="flex flex-row gap-4">
                    {props.item.tags.filter((tag, i) => i < 3).map((tag, i) =>
                        <span className="text-sm bg-primary-10 text-primary-100 px-2 py-1 rounded-lg">{tag.nome}</span>
                    )}
                </div>
            </div>
        </Link>
    )
}