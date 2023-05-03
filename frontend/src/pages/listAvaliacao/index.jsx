import { useContext, useEffect } from "react";

import {
    GlobalAlert,
    SidebarLayout,
    AlunoListAvalicao,
    ElaboradorListAvalicao,
} from "../../components";
import { GlobalContext } from "../../providers/context";

export default function ListAvaliacao() {
    const { setCurrentPage, getUser } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentPage("avaliacao");
    }, []);

    function renderSwitch() {
        if (getUser) {
            switch (getUser.extra_data.tipo_usuario) {
                case "elaborador":
                    return <ElaboradorListAvalicao />;
                case "aluno":
                    return <AlunoListAvalicao />;
                case undefined:
                    return null;
                default:
                    return null;
            }
        }
        return null;
    }

    return (
        <SidebarLayout>
            {renderSwitch()}
            <GlobalAlert />
        </SidebarLayout>
    );
}
