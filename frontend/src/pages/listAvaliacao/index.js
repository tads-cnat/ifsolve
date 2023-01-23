import { useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GetAvaliações } from "../../api/config";
import { GlobalAlert, PrimaryButton, SidebarLayout } from "../../components";
import { GlobalContext } from "../../providers/context";

export default function ListAvaliacao() {
    const {setCurrentPage} = useContext(GlobalContext)
    const [getData, setData] = useState([]);

    useEffect(() => {
        setCurrentPage("avaliacao")

        GetAvaliações().then((res) => {
            console.log(res);
            setData(res.data);
        });
    }, [])


    return (
        <SidebarLayout>
            <h1>Listar avaliacao</h1>
            <Link to="/avaliacao/criar"><FiPlus /> Avaliação</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {getData.length > 0 ? getData.map((item, i) => (<CardAvaliacao key={i} item={item}></CardAvaliacao>)) : "Nenhum item encontrado!"}
            </div>
            <GlobalAlert></GlobalAlert>
        </SidebarLayout>
    )
}

function CardAvaliacao(props) {
    return (
        <Link to={`/avaliacao/${props.item.id}/respostas`} className="bg-white px-4 py-2 rounded-lg">
            <h2 className="text-xl font-normal text-dark-100">{props.item.titulo}</h2>
            <p className="text-sm text-dark-80 break-words">{props.item.descricao}</p>
        </Link>
    )
}   