import { useEffect, useState, React } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { GetRespostasAlunoAvaliacao } from "../../api/config";
import { SidebarLayout } from "../../components";

export default function AlunoVisualizarRespostaAvaliacao() {
    const [getDados, setDados] = useState([]);

    let { id } = useParams();
    useEffect(() => {
        GetRespostasAlunoAvaliacao(id)
        .then(res => {
            setDados(res.data);
            console.log(res.data) // Array de objetos OK
            console.log(getDados) // Vazio
        })
        .catch(error => {
            console.log(error);
        })
    }, [id])

    return (  
        <> 
            <SidebarLayout>
                <p> Aqui vai aparecer minhas respostas </p>
                {/* {      
                    getDados.map((dado) => {
                        <p> {dado.data_hora}  </p> 
                    })
                } */}
            </SidebarLayout>    
        </>
    )
}