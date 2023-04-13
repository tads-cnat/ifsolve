import { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { CardItem, GlobalAlert, SidebarLayout } from "../../components"
import { GlobalContext } from "../../providers/context"
import { GetItemsPU } from "../../api/config";

export default function ElaboradorListarItem() {
    const { getListItens, setListItens, setItens, setCurrentPage } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentPage("questoes")
        GetItemsPU(setItens, setListItens).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <SidebarLayout>
            <div className="my-5">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Questões</h1>
                    <Link to="/criar/item" className="bg-primary-100 flex px-4 py-2 items-center gap-2 rounded-lg"><FiPlus /> Questão</Link>
                </div>

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
                            <CardItem key={item.id} content={item} />
                        )
                        : "Carregando itens"}
                </div>
            </div>
            <GlobalAlert />
        </SidebarLayout>
    )
}