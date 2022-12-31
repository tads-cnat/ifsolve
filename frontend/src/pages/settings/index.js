import { SidebarLayout } from "../../components";
import { Logout } from "../../api/config";
import { useNavigate } from "react-router-dom";


export default function Settings() {
    const navigate = useNavigate();

    function HandleLogout(e) {
        e.preventDefault();
        Logout().then((res) => {
            console.log(res);
            navigate("/");
        });
    }

    return (
        <SidebarLayout>
            <div className="md:container">
                <h1>Configurações</h1>
                <button onClick={(e) => HandleLogout(e)}>logout</button>
            </div>
        </SidebarLayout>
    )
}