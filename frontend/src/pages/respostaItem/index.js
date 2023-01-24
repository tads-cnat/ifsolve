import { useEffect, useState } from "react";
import { SidebarLayout } from "../../components";
import { GetRespostaByItem } from "../../api/config";
import { useParams } from "react-router-dom";


export default function RespostaItem() {
    const [getItem, setItem] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        GetRespostaByItem(id)
        .then(res =>{
            setItem(res.data);
        })
    }, [id]);

    return (
        <SidebarLayout>
            <p>Respostas</p>
            <br/>
            {getItem.length > 0 && getItem.map((resp) => (
                    <div>
                        <p>{resp.resposta}</p><br/>
                    </div>
                ))
            }
        </SidebarLayout>
    )
}