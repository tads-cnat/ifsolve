import { useContext } from "react"
import { GlobalContext } from "../../providers/context"
import AlunoListarItem from "../alunoListarItem";
import ElaboradorListarItem from "../elaboradorListarItem";

export default function ListarItem() {
    const { getUser } = useContext(GlobalContext);

    function Page() {
        if (getUser !== undefined) {
            switch (getUser.extra_data.tipo_usuario) {
                default:
                    return (<AlunoListarItem />)

                case "elaborador":
                    return (<ElaboradorListarItem />)
            }
        }
    }

    return (<>{Page()}</>)
}