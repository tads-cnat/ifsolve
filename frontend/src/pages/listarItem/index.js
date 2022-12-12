import { useContext, useEffect } from "react"
import { CardItem, SidebarLayout } from "../../components/"
import { GlobalContext } from "../../providers/context"
import { api } from "../../api/config";

export default function ListarItem() {
    const { getAccess, getItens, setItens, getListItens, setListItens } = useContext(GlobalContext);

    function getItems() {
        api.get("item/elaborador/",
            {
                headers: {
                    "Authorization": "Bearer " + getAccess,
                }
            },
        ).then((res) => {
            setItens([...res.data].reverse());
            setListItens([...res.data].reverse());
        })
    }

    useEffect(() => {
        getItems();
    }, [getAccess]);

    return (
        <SidebarLayout>
            <h1 className="text-2xl font-bold mb-5">Questões</h1>

            <div className="flex justify-between mb-5">
                <span className="basis-6/12">Encontramos <b> {getListItens.length} questões! </b>🙌</span>
                <select id="order" className="basis-2/12 p-3 rounded-lg">
                    <option value="volvo">Mais recentes</option>
                    <option value="saab">Mais antigos</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {getListItens.length > 0 ?
                    getListItens.map((item) =>
                        <CardItem key={item.id} content={item}></CardItem>
                    )
                    : "Carregando itens"}
            </div>
        </SidebarLayout>
    )
}