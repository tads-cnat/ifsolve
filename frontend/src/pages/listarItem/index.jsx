import { useContext } from "react";
import { GlobalContext } from "../../providers/context";
import AlunoListarItem from "../alunoListarItem";
import ElaboradorListarItem from "../elaboradorListarItem";

function Page() {
    const { getUser } = useContext(GlobalContext);
    if (getUser !== undefined) {
        switch (getUser.extra_data.tipo_usuario) {
            case "elaborador":
                return <ElaboradorListarItem />;

            default:
                return <AlunoListarItem />;
        }
    }
}

export default function ListarItem() {
    return <Page />;
}
